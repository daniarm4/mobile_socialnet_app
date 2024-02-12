from uuid import uuid4

from django.urls import reverse_lazy
from django.db.models import Case, When, BooleanField
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.core.cache import cache

from users.tasks import send_mail_task
from users.models import FriendRequest

User = get_user_model()


def create_new_user(user_data):
    '''Создать неактивного пользователя'''
    user = User.objects.create_user(
        username=user_data['username'],
        phonenumber=user_data['phonenumber'],
        email=user_data['email'],
        password=user_data['password1'],
        is_active=False
    )
    return user 


def send_confirm_link(request, user):
    '''Отправить ссылку для подтверждения аккаунта на почту'''
    token = uuid4().hex 
    cache.set(token, {'user_pk': user.pk}, timeout=180)
    confirm_link = request.build_absolute_uri(
        reverse_lazy('users:confirm-register', kwargs={'token': token})
    )
    send_mail_task.delay(
        'Register confirm',
        f'Link: {confirm_link}',
        [user.email],
    )     


def confirm_register_account(token):
    '''Подтверждение регистрации пользователя'''
    user_data = cache.get(token)
    user_pk = user_data.get('user_pk')
    user = User.objects.get(pk=user_pk)
    user.is_active = True 
    user.save()


def get_user_friend_requests(user):
    '''Получение всех запросов в друзья переданного пользователя'''
    return FriendRequest.objects.filter(receiver=user).select_related('sender')


def get_users_with_annotate_is_current_user_friend(user):
    '''Получение всех пользователей, с аннотированным полем is_current_user_friend (является ли 
    конкретный пользователь другом переданного пользователя) и сортировкой по этому полю'''
    user_friends = user.friends.all()
    return (
        User.objects
        .filter(is_active=True)
        .annotate(
            is_current_user_friend=Case(
                When(id__in=user_friends, then=True),
                default=False, 
                output_field=BooleanField()
            )
        )
        .only('id', 'username', 'avatar')
        .order_by('is_current_user_friend')
    ) 


def send_friend_request(sender, receiver):
    '''Отправить запрос другому пользователю, если запрос еще не создан'''
    if sender.sent_requests.filter(receiver=receiver).exists():
            raise ValueError('Friend request already sent.')
    if sender.received_requests.filter(sender=receiver).exists():
        raise ValueError('Friend request already received.')
    return FriendRequest.objects.create(sender=sender, receiver=receiver)


def accept_friend_request(friend_request_id):
    '''Принять существующий запрос в друзья, а затем удалить его из бд'''
    friend_request = get_object_or_404(FriendRequest, pk=friend_request_id)
    receiver = friend_request.receiver 
    sender = friend_request.sender
    with transaction.atomic():
        receiver.friends.add(sender)
        sender.friends.add(receiver)
        friend_request.delete()
