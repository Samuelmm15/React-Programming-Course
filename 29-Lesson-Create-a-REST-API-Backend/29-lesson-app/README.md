# 27 lesson Notes

At this lesson, we are going to learn how to create a backend of out aplication using Django.

### What is Django?

Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

## 27.1 - Install Django

First, we need to install Django. To do that, we need to open the terminal and type the following command:

```bash
pip install django
```

## 27.2 - Create Django Project

Now, we need to create a Django project. To do that, we need to open the terminal and type the following command:

```bash
django-admin startproject backend
```

## 27.3 - Create Django App

Now, we need to create a Django app. To do that, we need to open the terminal and type the following command:

```bash

cd backend

python manage.py startapp core

```

## 27.4 - Crud App

A Crud App is an app that realizes the basic operations of a database, that is, create, read, update and delete. This is important to understand because we will use this app to create our backend.

## 27.5 - Create a backed App

First of all, we need to create a virtual environment to create our backed app. To do that, we need to open the terminal and type the following command:

```bash
python -m venv .venv
```

At this form we are going to create a virtual environment called .venv

Then, we need to active the virtual environment. To do that, we need to open the terminal and type the following command:

```bash
. .venv/bin/activate
```

Then we need to install Django. To do that, we need to open the terminal and type the following command:

```bash
pip install django
```

At this time, we installed the Django, an usefull option is the command:

```bash
django-admin
```

To start a project, we need to type the following command:

```bash
django-admin startproject <<proyect-name>> .
```

Finally, we need to run the virtual server, so, we need to type the following command:

```bash
python manage.py runserver
```
