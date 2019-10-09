/*jslint esnext:true, browser:true*/
/**
 * @module Zombie
 */
// 1. Ne modifier QUE le fichier Zombie.js


// Vous devez modifier la méthode correspondante.

// 1. Le zombie attaque lorsque la souris entre dans sa zone (mouseover); Le zombie repart lorsque la souris sort de sa zone (mouse out). (extra) Vérifier si le zombie n'est pas mort.
// 1. Le zombie meurt lorsque l'on clique dessus. (il faut empêcher que le "click" soit également envoyé au #app)
// 1. Les méthodes "deplacer" et "arreter" n'ont pas à être modifiées.

// 100. (extra) Le zombie arrête ou repart lorsque l'on appuie sur n'importe quelle touche
// ## Variantes et ajouts possibles

export default class Zombie {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.destinationX = -400;
		this.destinationY = y;
	}
	
	// 1. Le div représentant le sprite devrait ressembler à ceci lors de la création : 
	// `<div class="sprite zombie" data-action="arret1" style="left: 0px; top: 100px;"></div>`
	creerSprite() {
		var resultat = document.createElement("div");
		resultat.classList.add("sprite");
		resultat.classList.add("zombie");
		resultat.setAttribute("data-action", "arret1");
		resultat.style.left = "0px";
		resultat.style.top = "100px";

		resultat.style.left = this.x + "px";
		resultat.style.top = this.y + "px";
		this.sprite = resultat;
		resultat.zombie = this;
		return resultat;
	}
	deplacer(x, y) {
		this.x = x;
		this.y = y;
		this.sprite.setAttribute("data-action", "marche" + Math.floor(Math.random() * 2 + 1));
		window.setTimeout(() => {
			this.sprite.style.left = this.x + "px";
			this.sprite.style.top = this.y + "px";
			this.sprite.style.transitionTimingFunction = "linear";
			this.sprite.style.transitionDuration = "20s";
			var me;
			this.sprite.addEventListener("transitionend", me = e => {
				this.arreter();
				this.sprite.removeEventListener("transitionend", me);
			});
		}, 50);
	}
	arreter() {
		this.sprite.style.left = this.sprite.offsetLeft + "px";
		this.sprite.style.top = this.sprite.offsetTop + "px";
		this.sprite.setAttribute("data-action", "arret" + Math.floor(Math.random() * 2 + 1));
	}

	mort() {
		this.sprite.setAttribute("data-action", "mort");
	}

	attaque() {
		this.sprite.setAttribute("data-action", "attaque");
	}



	
	/**
	 * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
	static main() {
		this.app = document.getElementById("app");

		
		// 1. La couleur d'arrière-plan de #app doit changer de façon aléatoire à toutes les 5 secondes. Utiliser la méthode couleurAlea.
		var interval = setInterval(() => {
			this.app.style.backgroundColor = this.couleurAlea();
		}, 5000);
		
		
		
		
		var zombie = new Zombie(window.innerWidth - 485, 100);
		this.app.appendChild(zombie.creerSprite());

		// 1. Le zombie démarre lorsque l'on clique sur le #app
		this.app.addEventListener("click", e => {
			zombie.deplacer();
		})
		  
		zombie.sprite.addEventListener("click", e => {
			zombie.mort();
			e.stopPropagation();
		})
		
		window.addEventListener("keydown", e => {
			zombie.mort();
			
		})
		
		zombie.sprite.addEventListener("mouseover", e => {    
			zombie.attaque();
			e.stopPropagation();
		});

		window.addEventListener("mouseout", e => {   
			zombie.deplacer();
			e.stopPropagation();
		});


		zombie.sprite.addEventListener("click", e => {
			
			
			//Pour redémarrer l'animation
			zombie.sprite.style.animationName = "none";
			window.setTimeout(() => {
				zombie.sprite.style.removeProperty("animation-name");
			}, 50);
		});

		
	}
	
	static ajouterStyle() {
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/zombie.css");
		document.head.appendChild(link);
	}
	static couleurAlea() {
		var h = Math.floor(Math.random() * 360);
		var s = Math.floor(Math.random() * 50 + 50);
		var l = Math.floor(Math.random() * 100);
		return "hsl("+h+","+s+"%,"+l+"%)";
	}
}
Zombie.ajouterStyle();
