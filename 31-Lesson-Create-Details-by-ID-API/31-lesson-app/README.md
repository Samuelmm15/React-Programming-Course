# 30 lesson Notes

At this lesson, we are going to continue to build the backed api using Django.

At first, we are going to create a file called `admin.py` in the `backend` folder.

This file is used to register the models to the admin site. But at first we need to create a superuser.

```bash
python manage.py createsuperuser
```

Then we can register the models to the admin site that we created at the file `admin.py`.

## **NOTE**

Take care with the migrations of the models. If you change the name of the model, you need to re-migrate the model with the new name, because, if you don't do that, the admin site will not recognize the model, and send an error.

## Include the backend api in the frontend app

At this point, we can put the backend api in the frontend app. We are going to add the backend API into the file called `Customers.js` in the folder `src/components`.

Finally, to permits that the origin of the frontend app can consume the backend api, we need to install the package called `django-cors-headers`.

```bash
pip install django-cors-headers
```

Then we need to add the package to the `INSTALLED_APPS` in the file `settings.py` in the folder `backend`.

```python
INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'customers',
]
```

And we need to add the middleware to the `MIDDLEWARE` in the file `settings.py` in the folder `backend`.

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

Then, we need to add the CORS_ORIGIN_ALLOW_ALL to the `settings.py` in the folder `backend`.

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    ...
]
```

## **NOTE**

To understand how to do all the process, you can see the local file of our project, called `Customers.js` in the folder `src/components`.
