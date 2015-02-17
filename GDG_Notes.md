# Notes pour nous
Le but est de créer un composant comme dans le code lab de google. J'ai juste modifié le codelab afin de rajouter des étapes et de ne pas arriver direct à la phase d'utilisation de Polymer Paper !  Car en fait ce que veulent les gens en premier lieu c'est créer N composants, les voir interagir etc...


# Description des répertoires

* starter : répertoire de départ, il sera remplit de façon incrémentale ! 
* step-1 : création du composant post-card sans style
* step-2 : ajout du style et du contenu (vérifier l'isolation)
* step-3 : création du comoposant post-list
* step-4 : Ajout du style de paper pour se simplifier la vie au niveau des styles
* step-5 : mise en place d'interactions

# Initialisation : 

1. Git clone ou dl du repo
2. Soit les participants ont nodeJS et ils peuvent garder leur ide
  1. Ont-ils grunt ? npm instll -g grunt-cli
  2. npm install
  3. grunt => ça lance un serveur
3. Soit ils n'ont pas nodeJS et ils vont utiliser dans ce cas le DevEditor de chrome pour faciliter le travail (ou encore brackets pour la partie livereload)

# Step 1 

## Création du composant fichier html post-card.html

```html
<link rel="import" href="../components/polymer/polymer.html">

<polymer-element name="post-card">
    <style type="text/css">
    </style>
    <template>
        <div> 
            Hello GDG Folks !
        </div>
    </template>
    <script>
        Polymer({

        });
    </script>
</polymer-element>
```

Ne pas oublier le 

```html
<link rel="import" href="../components/polymer/polymer.html">
```

Ne pas oublier non plus l'appel à Polymer
Sans ça on ne peut pas afficher le contenu ! 

## Mis à jour du index.html

```html
<link rel="import" href="post-card.html"> 

...

<body unresolved>

    <post-card></post-card>

    ...
```

1. Import du html ! 
2. Ajout du unresolved pour éviter le ```flash of unstyled content FOUC``` sur les navigateurs qui n'ont pas nativement les customs éléments (cf codelab google )
3. Ajout de la balise post-card
4. Essayez d'ajouter une div dans la balise post-card : 

```html
<post-card><div>test</div></post-card>
```

Cette dernière n'est pas visible car elle fait partie du shadow-DOM et on ne sait pas où la placer ! (cf step-2)


## Step-2

Il fait référence au step-3 du codelab polymer

Mise en place du style de post-card et du contenu ! 

```html
<style>
    :host {
      display: block;
      position: relative;
      background-color: white;
      padding: 20px;
      width: 100%;
      font-size: 1.2rem;
      font-weight: 300;
    }
    .card-header {
      margin-bottom: 10px;
    }
     /* Add your styles here: */
    .card-header ::content h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 300;
    }
    .card-header ::content img {
      width: 70px;
      border-radius: 50%;
      margin: 10px;
    }

</style>

<div class="card-header">
  <content select="img"></content>
  <content select="h2"></content>
</div>
<content></content>
```


A noter coté style la présence de :host. host c'est pour indiquer l'élément père (une sorte de body du custom element ! ). 


les balises <content> font références au html qui est intégré dans la balise post-card du index.html ! Il s'agit de point d'insertions. Cela fait référence à la div qui n'était pas rendue visuellement tout à l'heure ! Le select est un sélecteur css (pas tous ! ). Pour styliser les points d'insertion, on utilise ::content

1. Ajouter le contenu html
2. Ajouter le contenu css
3. Ajouter du contenu dans le index.html
4. Jouer avec les selecteurs et les imports pour voir comment ça se comporte
    1. Ajout d'une image (après le h2 par exemple et constater son emplacement !)
    2. Ajout de contenu supplémentaire
    3. Jouer sur un sélecteur plus précis (genre avec un id ou via d'autres elements)

```html
<post-card>
    <img width="70" height="70" 
      src="../images/avatar-07.svg">
    <h2>Another Developer</h2>
    <p>Hello GDG Folks!</p>
  </post-card>
```


# Step 3


## Création du post-list.html

On va créer maintenant le composant post-list afin de manipuler l'encapsulation ! 

```html
<link rel="import" href="../components/polymer/polymer.html">
<link rel="import" href="../post-service/post-service.html">
<link rel="import" href="post-card.html">

<polymer-element name="post-list">
  <template>
    <style>
    :host {
      display: block;
      width: 100%;
    }
    post-card {
      margin-bottom: 30px;
    }
    </style>

    <post-service id="service" posts="{{posts}}">
    </post-service>

    <div>

      <template repeat="{{post in posts}}">
        <post-card>
          <img src="{{post.avatar}}" width="70" height="70">
          <h2>{{post.username}}</h2>
          <p>{{post.text}}</p>
        </post-card>
      </template>

    </div>

  </template>

  <script>
  Polymer({
    // define the element's JavaScript prototype here
  });
  </script>

</polymer-element>

```

* On a toujours l'import de polymer 
* On remarque l'import de post-card ! 
* On a un import nouveau lié à notre webservice ! à noter l'utilisation d'un appel sous forme de balises ! C'est une bonne pratique polymer (on expose nos éléments)
* On remarque le databinding comme dans Angular ! Attention cependant, le repeat doit etre fait avec une balise template ! On ne peut pas jouer le repeat sur une div !


## Modification du index.html

dans le index.html on retire l'import de post-card.html et à la place on met post-list.html car l'import est fait dans post-card. Au final s'il y a du multiple import, l'import ne se fait qu'une fois


```html
<head>
    ...
    <link rel="import"
        href="post-list.html">
  
</head>
<body unresolved>
  <div class="container">
     <post-list></post-list>
  </div>
  <script src="app.js"></script>
</body>
```

# Step 4 

On va commencer à jouer avec les composants Polymer afin d'afiner l'ihm

## Ajout du conteneur responsive et flex

```html
<link rel="import"
  href="../components/core-header-panel/core-header-panel.html">
<link rel="import"
  href="../components/core-header-panel/core-header-panel.html">
<link rel="import"
  href="../components/core-toolbar/core-toolbar.html">
<link rel="import"
  href="../components/paper-tabs/paper-tabs.html">

<body unresolved fullbleed layout vertical>
    <core-header-panel flex>
        <core-toolbar>
          <paper-tabs class="fit" selected="messages" flex>
            <paper-tab name="messages">Messages</paper-tab>
            <paper-tab name="favorites">Favorites</paper-tab>
          </paper-tabs>
        </core-toolbar>
        <div class="container" layout vertical center>
          <post-list></post-list>
        </div>
    </core-header-panel>
</body>
```

* Le Core header est un conteneur responsive qui gère un header
* Le core toolbar est une sorte d'action bar
* fullbleed spécifie que l'on veut un écran sans marge et sans padding
* layout spécifie qu'on utilise la propriété flex
* vertical spécifie que le mode flex appliqué est en column
* Le flex spécifie que ce conteneur doit prendre toute la place qu'il peut

## Customisation du style css

```css
core-toolbar {
  background: #03a9f4;
  color: white;
}
paper-tabs {
  text-transform: uppercase;
}
```

## Customisation de nos composants

### Post card

```html
 <div class="card-header" layout horizontal center>
```

Notre carte est donc flex centrée verticallement et horizontale

### Post List

```html
<div layout vertical center>
```

Notre list est donc flex centrée horizontallement et verticale

# Step 5

On va ajouter des actions, se brancher sur les événements de polymer et filtrer notre liste ! 

## Ajout du bouton sur la carte

On va utiliser un autre composant polymer (sorte de font-awesome)

```html
<link rel="import"
  href="../components/core-icon-button/core-icon-button.html">
```

On va styliser ce button 

```css
    core-icon-button {
      position: absolute;
      top: 3px;
      right: 3px;
      color: #636363;
    }
    :host([favorite]) core-icon-button {
      color: #da4336;
    }
```

On note l'utilisation du :host pour le style car l'attribut sera exposé directement sur la balise ! 

```html
    <div class="card-header" layout horizontal center>
      <content select="img"></content>
      <content select="h2"></content>
    </div>

    <core-icon-button
      icon="favorite"
      on-tap="{{favoriteTapped}}">
    </core-icon-button>

    <content></content>
```

On référence via binding la méthode à appeler lors du clic ! 

```javascript
 Polymer({
      publish: {
        favorite: {
          value: false,
          reflect: true
        }
      },
      favoriteTapped: function(event, detail, sender) {
        this.favorite = !this.favorite;
        this.fire('favorite-tap');
      }
    });
```

On publie donc notre value 'favorite'. value:false veut dire que la valeur par défaut est false. reflect:true signigie que l'attribut doit etre mise à jour sur le dom quand la valeur change (si c'est false, on ne voit pas l'attribut)

La méthode favoriteTapped est la méthode appelée lors du clic. On note aussi qu'un événement sera broadcasté

## Intégration du favoris dans la liste

```html
 <post-card
    favorite="{{post.favorite}}"
    on-favorite-tap="{{handleFavorite}}">
```

* On récupère l'information issu du service
* On fait quelque chose lors du clic (notez la syntaxe adoptée)

```javascript
Polymer({
    handleFavorite: function(event, detail, sender) {
      var post = sender.templateInstance.model.post;
      this.$.service.setFavorite(post.uid, post.favorite);
    }
  });
```

On met à jour de le service

* this.$ est un raccourci nous permettant d'accéder à des id du dom de notre composant. Ainsi this.$.service nous permet d'accéder à la balise ```<post-service id="service">```
* this fait référence au Polymer Element 

## Remontée des informations dans la page

Il faut maintenant mettre à jour notre interface pour faire correspondre tout ça. En fonction du clic sur l'onglet, on affichera ou non les post-card.

### Ajout de la gestion de la visibilité de la post-card

On va modifier la list


```html
<polymer-element name="post-list" attributes="show">
```

On va exposer un attribut qui sera accessible dans le prototype du webcomponent

```html
 <post-card
      favorite="{{post.favorite}}"
      on-favorite-tap="{{handleFavorite}}"
      hidden?="{{show == 'favorites' && !post.favorite}}">
```

On va conditionner l'affichage via l'attribut hidden? qui evaluera le contenu. On doit enfin modifier le fichier index.html pour prendre en compte ce nouvel attribut exposé ! 


```html
<post-list show="messages"></post-list>
```

La valeur de show correspondra à la valeur de l'onglet sélectionné


### Ecoute du clic de tab

On va ajouter enfin du code à notre javascript applicatif et on va écouter la sélection d'onglet.


```javascript
var tabs = document.querySelector('paper-tabs');

var list = document.querySelector('post-list');

tabs.addEventListener('core-select', function() {
  list.show = tabs.selected;
});
```


On mettra à jour l'attribut qui sera ainsi répercuté sur l'affichage