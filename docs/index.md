---
layout: default
---

## Descripción del problema

Nuestro proyecto consiste en el análisis de la página web de agregación de contenido Reddit. La plataforma sirve para publicar y leer contenido de diferentes temáticas.  Los usuarios de Reddit son tanto creadores cómo consumidores del contenido alojado en la página.

El sitio web está compuesto por comunidades individuales conocidas cómo subreddits. Dentro de cada subreddit se publican post relacionados que giran entorno a una temática. Se puede interactuar con estos posts principalmente publicando un comentario y dejando un voto positivo o negativo, obteniendo el post asi interacciones y valoraciones de los usuarios.

Reddit engloba todo tipo de contenidos: vídeos, imágenes, enlaces, textos,etc… Es como una especie de foro dividido en subforos de todo tipo de temáticas donde los usuarios pueden comentar y votar posts realizados por otros usuarios.

En Reddit se genera una cantidad enorme y dispersa de información sobre todo tipo de temáticas. Por eso, para realizar un análisis del contenido es necesario utilizar Big Data.

## Descripción de la necesidad de Big Data

Cómo consecuencia de la enorme actividad de Reddit, se generan constantemente y a grandes velocidades muchísimos datos. Por eso, encontramos necesario realizar procesamiento Big Data para obtener información de gran utilidad.

Se pueden llegar a crear hasta 80 comentarios por segundo, y hasta 20 posts. Por poner un ejemplo, solo el mes de Enero del dataset utilizado ocupa 4 GB comprimido y 47 descomprimido.

![Estadisticas de Reddit](https://github.com/beybo/ProyectoRedditCloud/raw/master/docs/assets/img/stats.png "")

Además, aprovechando el procesamiento de datos en paralelo podemos conseguir que dicho procesamiento se realice de manera mucho más efectiva y rápida utilizando el servicio EMR proporcionado por Amazon.

## Descripción de la solución y comparación con el trabajo existente sobre el problema

### Descripción de la solución

Para abordar la solución hemos utilizado cómo lenguaje de programación Python y el framework Spark para procesar datos distribuidos junto a Hadoop.

Hemos diseñado varias utilidades que  proporcionan información relevante acerca del contenido publicado en Reddit en meses anteriores. Principalmente nos hemos enfocado en extraer información de  los subreddits más populares y sus características. También hemos desarrollado scripts más generales que contemplan todos los subreddits, no sólo los más populares. Las funcionalidades desarrolladas obtienen la siguiente información para el mes de Enero de 2019:

- La franja horaria donde se consigue mayor puntuación.
- La franja horaria donde se consigue mayor puntuación en cada subreddit.
- El número de posts por dia y por subreddit.
- El número de palabras que tienen los 100 post más votados en su contenido.
- El número de palabras que tienen los 100 post más votados en su título.
- El número de posts en todo Reddit etiquetado cómo nsfw(over_18).
- El número de posts de cada subreddit etiquetados cómo nsfw(over_18).
- Los 10 subreddits con más puntuación.
- Los 10 subreddits con más comentarios.
- Relación de puntuación y número de comentarios de cada subreddit.
- Los usuarios que más han posteado en cada subreddit.

La información producida por los scripts desarrollados, la mostramos en diferentes gráficos realizados con las librerías de Javascript amcharts y flourish studio. Estas librerías permiten visualizar gráficas interactivas con un gran dinamismo y bonita apariencia a partir de los resultados de los scripts.

### Trabajo existente relacionado

La propia página de agregación de contenido ofrece la posibilidad de ver los posts y subreddits que son relevantes en la actualidad, pero no muestra los de días anteriores. Esta funcionalidad puede ser útil para los usuarios que utilizan a diario la plataforma pero no proporcionan un análisis más allá del momento actual.

Además existe la página [subredditstats](https://subredditstats.com/), que muestra algunas estadísticas actuales  de los subreddits. Esta información que nos ofrece es útil pero tiene algunas limitaciones en nuestra opinión, ya que son estadísticas muy generales y no muestran estadísticas de fechas anteriores. 

## Descripción del modelo y / o datos en detalle: de dónde vino, cómo lo adquirió, qué significa, etc

El dataset utilizado ha sido descargado desde [pushshift.io](https://pushshift.io/). La filosofía de pushshift.io es simple, agregar todo el contenido que existe de reddit en un dataset para poder trabajar con los datos usando técnicas de Big Data.

[Aquí](https://files.pushshift.io/reddit/) está el directorio de contenido donde se encuentra nuestro dataset entre muchos otros y el [enlace directo al dataset](https://files.pushshift.io/reddit/submissions/RS_2019-01.zst).

En reddit los dos elementos principales son: posts y comentarios. En nuestro análisis hemos utilizado posts. Un post tiene campos como:

- title: Titulo del post.
- author: El autor del post
- created: Fecha de creación
- subreddit: Subreddit al que pertenece
- num_comments: Número de comentarios
- ...

Cada post tiene muchos más campos que estos que se pueden revisar descargando una muestra del dataset aquí. Además en esta página de documentación se ofrece una explicación más detallada de la mayoría de estos.

## Descripción técnica de la (aplicación paralela), modelos de programación, plataforma e infraestructura

En cuanto a la infraestructura se ha utilizado un cluster m4x.large de AWS, de un nodo master y otros dos workers, proporcionado por el servicio de EMR de AWS.

El modelo de programación utilizado es el brindado por el framework Spark 2.4.4 utilizando el lenguaje Python y además haciendo uso del framework Hadoop 2.8.5 YARN.

Para el almacenamiento del dataset hemos utilizado también un cubo del servicio S3 de AWS.

## Descripción técnica del diseño del software, línea base del código, dependencias, cómo usar el código y el sistema y el entorno necesarios para reproducir sus pruebas

Si deseas probar el código, pincha [aquí](https://github.com/beybo/ProyectoRedditCloud) para acceder a las instrucciones colgadas en el repositorio del proyecto.

## Evaluación del rendimiento (aceleración, rendimiento, scalado débil y fuerte) y discusión sobre los gastos generales y optimizaciones realizadas

A continuación detallamos una tabla con el número de nodos y ejecutores y el tiempo que ha llevado la ejecución del script S3_reddit.py en un cluster m4x.large:

| Número de Ejecutores | Número de Cores | Tiempo |
|:-------------|:------------------|:------|
|1|1|3m41.304s|
|1|2|3m16.283s|
|1|4|3m1.252s|
|2|1|3m39.638s|
|2|2|3m10.456s|
|2|4|2m51.837s|



## Descripción de características avanzadas como modelos / plataformas no explicado en clase, funciones avanzadas de los módulos, técnicas para mitigar gastos generales, aspectos desafiantes de paralelización o implementación

Uno de los aspectos más desafiantes de la implementación y paralelización ha sido el de trabajar con un dataset de 50GB.

No solo tuvimos que implementar el código intentando optimizar los recursos de memoria disponibles (por ejemplo realizando SELECTS de solo los datos necesarios en cada etapa del pipeline en vez de seleccionar todo), también tuvimos que realizar varias pruebas en diferentes máquinas para encontrar la que más se ajustaba en cuanto a rendimiento y coste.

Otra técnica para la mejora del rendimiento que realizamos fue aumentar la memoria de Spark a 9486MB modificando un parámetro del archivo de configuración ubicado en `/etc/spark/conf.dist/spark-defaults.conf spark.driver.memory`  

## Discusión final sobre los objetivos alcanzados, mejoras sugeridas, lecciones aprendidas, trabajo futuro, ideas interesantes

Reflexionando sobre los objetivos alcanzados, creemos que hemos realizado con éxito un estudio que ofrece una visión interesante y curiosa sobre los posts del mes de Enero de 2019 de Reddit. Además para hacer algo diferente y ofrecer una experiencia más interactiva hemos logrado mostrar el resultado mediante una serie de gráficas interactivas gracias a las librerías amcharts y flourish studio.

Hemos aprendido mucho sobre la cantidad de poder computacional necesaria para trabajar con este tipo de datasets de gran tamaño. Al elegir un dataset de casi 50GB pudimos experimentar de primera mano las dificultades que conlleva trabajar con una cantidad enorme de datos.  Algunas de estas dificultades han sido: seleccionar pequeñas muestras de datos para poder trabajar de manera local, realizar alguna optimización tanto de código como de configuraciones para conseguir que funcionara todo correctamente, hacer pruebas para comprobar el rendimiento de la infraestructura entre otras.

Hemos pensado que una opción interesante para el futuro, además de realizar otros tipos de estudios sobre el dataset, podría ser la implementación de algún modelo de Machine Learning con la que podamos usar los conocimientos obtenidos en este proyecto para predecir la puntuación de un post. También resultaría interesante juntar todos los dataset de pushift.io de reddit para realizar un estudio más general de Reddit.

















