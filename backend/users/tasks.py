from django.core.mail import send_mail
from celery import shared_task


@shared_task
def send_mail_task(subject: str, message: str, to: list[str]):
    status = send_mail(
        subject=subject,
        message=message,
        from_email=None,
        recipient_list=to,
        fail_silently=False
    )
    if status == 1:
        return 'Mail sended'
    return 'Error'
