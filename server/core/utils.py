import json
import time 
import hashlib
import os



def parse_serializer_error(errors):
    messages = []
    for key in errors:
        message = f"{key} {str(errors[key])}"
        messages.append(message)

    return messages



def upload_file_path(instance, filename):

    filename_parts = list( reversed( filename.split('.') ) )
    extension = filename_parts[0]
    filename_parts.pop(0)
    filename_no_extension = ''.join( filename_parts )
    filename_no_extension = hashlib.md5(filename_no_extension.encode('utf-8')).hexdigest()

    return f'core/static/{filename_no_extension}-{int(time.time())}.{extension}'


def remove_null_values_from_erequest(data):
    data = data.dict()
    formatted_data = {}

    for key in data:
        value = data[key]
        if value == 'null' or value == '':
            value = None
        formatted_data[key] = value

    return formatted_data


def delete_file(file):
    file = str(file)
    if os.path.exists(file):
        os.unlink(file)