# Notes pour nous
Le but est de créer un composant comme dans le code lab de google. J'ai juste modifié le codelab afin de rajouter des étapes et de ne pas arriver direct à la phase utilisation de Polymer Paper !  Car en fait ce que veulent les gens en premier lieu c'est créer N composants, les voir interagir etc...


# Description des répertoires

* starter : répertoire de départ, il sera remplit de façon incrémentale ! 
* step-1 : création du composant post-card sans style
* step-2 : ajout du style et du contenu (vérifier l'isolation)
* step-3 : création du comoposant post-list
* step-3+ : équivalent au steps de Google

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

Cette dernière n'est pas visible car elle fait partie du shadowdom et on ne sait pas où la placer ! (cf step-2)


## Step-2

il fait référence au step-3 du codelab polymer

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
