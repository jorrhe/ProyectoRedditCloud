# Análisis de Reddit

En este proyecto, hemos generado scripts para analizar 
la página web de agregación de contenido Reddit.

Para más información accede a la [página web del proyecto](https://beybo.github.io/ProyectoRedditCloud/).

El proyecto ha sido realizado para la asignatura de Cloud y Big Data por:

- Daniel Alcázar Muñoz
- Jorge Roselló Martín
- Francisco Javier Lozano Hernández

El dataset con los post que hemos utilizado para este proyecto ha sido
descargado desde [pushshift.io](https://pushshift.io). 
El mes que hemos utilizado es el de enero de 2019, y se puede descargar
directamente desde [aquí](https://files.pushshift.io/reddit/submissions/RS_2019-01.zst).

Si quieres utilizar los scripts para analizar más meses lo único que necesitas
hacer es descargar el dataset del mes deseado desde [aquí](https://files.pushshift.io/reddit/submissions/).

## Estructura

El proyecto está dividido en los siguientes directorios y ficheros:

    .
    ├── docs                 # Los ficheros para la página web.
    ├── ficheros             # Ficheros de ejemplo para desarrollar los script
    ├── salida               # Ficheros con la salida de cada script
    ├── scripts              # Los scripts del proyecto
    ├── LICENSE
    └── README.md

> No hemos podido incluir el dataset por que el tamaño es demasiado grande,
> por eso en el directorio `ficheros` hay dos ficheros de prueba.

## Requisitos

Para poder ejecutar los scripts recomendamos tener un entorno que tenga:

- Spark: `2.4.4`
- Hadoop: `2.8.5`

Todas las pruebas las hemos realizado creando un cluster EMR de AWS con la siguiente
configuracion:

- Release: `5.29.0`
- Launch mode: "Cluster"
- Instance type: m4.xlarge

## Ejecución

Los pasos escritos a continuación son los que hemos seguido para ejecutar los
scripts en un cluster EMR de AWS.

### 1. Dataset

Recomendamos subir el dataset descomprimido que se ha descargado desde pushshift.io,
a un S3.

Esto lo hicimos porque en nuestro caso, el dataset del mes que escogimos
ocupaba unos 50GB.

### 2. Configuración del nodo maestro

Una vez que hemos lanzado el cluster EMR necesitamos configurar algunos parámetros
en el nodo máster.

#### Acceso al dataset

Para poder acceder directamente al dataset subido al S3 se puede hacer de dos formas:

1. Accediendo directamente al dataset desde el script spark a través de una url con el 
   formato `s3a://<CUBO>/[RUTA_AL_DATASET]`
   
2. Montando el cubo S3 al nodo maestro como un directorio y subir el fichero
   al Hadoop File System directamente.
   
Nosotros tuvimos problemas con la primera opción asi que decidimos optar por la segunda.
Para poder montar el cubo S3 es necesario instalar en el nodo maestro el sistema de ficheros
[S3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse).

#### Configuración de Spark

Al trabajar con un dataset tan grande es necesario aumentar la memoria disponible
que tiene spark, para ello tenemos que editar el fichero 
`/etc/spark/conf.dist/spark-defaults.conf` para que tenga esta linea:

    ...
    spark.driver.memory              9486M
    ...

### 3. Lanzar los scripts

Todos los scripts se lanzan de la misma forma, por ejemplo para lanzar el script
S1 el comando seria:

```shell
spark-submit s1_reddit.py --file [RUTA_AL_DATASET]
```

La salida del script se va a encontrar en el HFS en un directorio con `s<NUMERO_SCRIPT>_salida`.
En el caso del ejemplo anterior, el nombre del directorio es `s1_salida`.

### 4. Recopilar la salida (Opcional)

Una vez que se ha ejecutado el script puedes extraer el directorio con el comando:

```shell
hadoop fs -get s[NUMERO_SCRIPT]_salida .
```

Luego ejecutando el comando

```shell
cat s[NUMERO_SCRIPT]_salida/*.json > salida.json
```

Nos va a generar un fichero `salida.json` con todos los datos en un mismo fichero.
