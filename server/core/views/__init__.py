from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):

    response = exception_handler(exc, context)

    errors_text = []

    if response.status_code == 401:
        response.data['detail'] = 'Unauthorized'
    elif not response.data.get('detail',None):
        for key in response.data:
            errors = response.data[key]
            for error in errors:
                error_text = key + ': ' + error
                errors_text.append(error_text)

        response.data = errors_text
    
    return response