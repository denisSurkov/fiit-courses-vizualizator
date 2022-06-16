<br />
<div align="center">
  <a href="https://github.com/denisSurkov/fiit-courses-vizualizator">
    <img src="src/assets/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Визуализатор спецкурсов для ФИИТ</h3>

  <p align="center">
    Узнай больше о спецкурсах!
    <br />
    <br />
    <a href="https://www.figma.com/proto/WGF4bQoWjH0xPK7dlgOUH8/Design-for-fiit-courses-vizualizator?node-id=51%3A243&starting-point-node-id=51%3A243&show-proto-sidebar=1&scaling=scale-down-width">Деплой</a>
    ·
    <a href="http://62.84.114.245:8081/">Прототип в Figma</a>
  </p>
  <p align="center">
    <a href="https://github.com/denisSurkov/fiit-courses-vizualizator/issues">Сообщить о проблеме</a>
    ·
    <a href="https://github.com/denisSurkov/fiit-courses-vizualizator/issues">Предложить новую функцию</a>
  </p>
</div>

  ## Содержание
  <ol>
    <li>
      <a href="#описание-проекта">Описание проекта</a>
      <ul>
        <li><a href="#аттестация">Аттестация</a></li>
      </ul>
    </li>
    <li>
      <a href="#начало-работы">Начало работы</a>
      <ul>
        <li><a href="#запуск-проекта">Запуск проекта</a></li>
      </ul>
    </li>
    <li><a href="#использование">Использование</a></li>
    <li><a href="#ссылки">Ссылки</a></li>
  </ol>


## Описание проекта

**Визуализатор спецкурсов для ФИИТ** - это сервис, предназначенный для студентов направления [Фундаментальная информатика и информационные технологии в УрФУ](https://fiit-urfu.ru/). 

Сервис создан для того, чтобы помочь студентам ФИИТ определиться с выбором спецкурсов на 3 и 4 курсах обучения.

**Приложение находится в стадии разработки.**

### Аттестация

Это учебный проект в рамках курса "Основы веб-разработки" ФИИТ. 

Полное описание проекта, необходимое для прохождения аттестации, вы можете посмотреть в [ATTESTATION.md](https://github.com/denisSurkov/fiit-courses-vizualizator/tree/master/ATTESTATION.md)


## Начало работы

Чтобы запустить проект локально, выполните следующие шаги.


### Запуск проекта

   ```sh
   git clone https://github.com/denisSurkov/fiit-courses-vizualizator
   cd fiit-courses-vizualizator
   npm install
   npm start
   ```

   и откройте созданный `./public/index.html` 

## Использование

Создание html-страниц происходит во время исполнения команды `npm start`

Запустите команду снова, если хотитие пересоздать страницы после изменения данных

Изменить данные можно путём редактирования json-файлов в `./src/configuration`

## Ссылки

- [Прототип приложения в Figma](https://www.figma.com/proto/WGF4bQoWjH0xPK7dlgOUH8/Design-for-fiit-courses-vizualizator?node-id=51%3A243&starting-point-node-id=51%3A243&show-proto-sidebar=1&scaling=scale-down-width)
- [Деплой master ветки репозитория](http://62.84.114.245:8081/)
