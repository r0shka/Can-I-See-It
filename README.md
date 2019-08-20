![App image](https://i.imgur.com/6ghivqE.png)

**_English version below_**
# Can I See It? (French)

Can I See It est une application web  en Javascript qui  reproduire la vue en 360 degrés qui s’ouvre depuis une montagne,
en affichant les informations sur les environs (montagnes et villes).
A l’ouverture de l’application, l’utilisateur a deux possibilités d’entrée de la position de caméra à
partir des coordonnés ou du nom montagne.


## La version en ligne

https://can-i-see-it-f6f26.web.app/

## Installation

• Offline: télécharger tout les fichiers et lancer index.html

• Online: mettre tout les fichiers dans la racine du site

## Framework & API

• L'application utilise le framework Cesium Ion qui offre 15 gigaoctets de streaming pour le terrain 3D et 1000 sessions de Bing Maps pour imagerie satellite par mois, et CesiumJS pour gérer ces données. Pour plus d'informations : https://cesium.com/

• Pour les données cartographiques, on a utilisé la base de données géographiques gratuite GeoNames. La base de données contient plus de 8 millions de noms géographiques qui correspondent à plus de 6,5 millions de lieux existants. Pour plus d'informations :
https://www.geonames.org/



## TODOs

• Téléchargement de tout les montagnes / villes d’un pays et de ses voisins nous donnes beaucoup de l’information inutile. Par exemple, en positionnant la caméra sur Denali en Alaska,
on télécharge les informations sur tous les montagnes / villes du Mexique. Il serait plus raisonnable de télécharger les données par les régions.

• Les points peuvent être vu à travers le terrain 3D. Pour éviter cela, il faut effectuer une étude
du terrain qui sépare la montagne et le point d’observation, pour déterminer si la montagne
peut être vu, et donc s’il faut afficher le point ou pas.

• La taille du plugin de boussole est 40 fois plus grand que le reste de l’application. La suppression des fonctions de plugin non utilisé permettra de réduire sa taille.

• Cacher les cléfs API. Car l'application est coté client uniquement, on ne peut pas cacher les cléfs d'accés de Cesium et GeoNames. Pour résoudre cela il faut utilisé un serveur, au quel on demandera ces cléfs.

---

# Can I See It? (English)

Can I See It is a CesiumJS web application that recreates a 360 degrees view from a mountain and shows the information on the surrounding peaks and cities.

## Live version

https://can-i-see-it-f6f26.web.app/

## Framework & API

• Application is based on Cesium framework which provides a free limited use of 3D geospatial data. More information at : https://cesium.com/

• Geographical data is fetched via API from GeoNames. More information at :
https://www.geonames.org/

• The compass is not a part of Cesium by default, for that we use a 3rd party plugin (https://github.com/alberto-acevedo/cesium-navigation)
