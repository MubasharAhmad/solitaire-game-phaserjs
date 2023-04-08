
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// Top Bar
		const top_Bar = this.add.container(1, 0);

		// tilesprite_1
		const tilesprite_1 = this.add.tileSprite(403, 25, 64, 64, "_MISSING");
		tilesprite_1.scaleX = 12.80173314451295;
		tilesprite_1.scaleY = 0.9576815236056202;
		tilesprite_1.tintFill = true;
		tilesprite_1.tintTopLeft = 13684944;
		tilesprite_1.tintTopRight = 13684944;
		tilesprite_1.tintBottomLeft = 13684944;
		tilesprite_1.tintBottomRight = 13684944;
		top_Bar.add(tilesprite_1);

		// placeholder
		const placeholder = this.add.image(705, 142, "placeholder");
		placeholder.scaleX = 0.2992899054086054;
		placeholder.scaleY = 0.25373372306906;

		// placeholder_1
		const placeholder_1 = this.add.image(601, 142, "placeholder");
		placeholder_1.scaleX = 0.2992899054086054;
		placeholder_1.scaleY = 0.25373372306906;

		// placeholder_2
		const placeholder_2 = this.add.image(497, 142, "placeholder");
		placeholder_2.scaleX = 0.2992899054086054;
		placeholder_2.scaleY = 0.25373372306906;

		// placeholder_3
		const placeholder_3 = this.add.image(393, 142, "placeholder");
		placeholder_3.scaleX = 0.2992899054086054;
		placeholder_3.scaleY = 0.25373372306906;

		// placeholder_4
		const placeholder_4 = this.add.image(393, 285, "placeholder");
		placeholder_4.scaleX = 0.2992899054086054;
		placeholder_4.scaleY = 0.25373372306906;

		// placeholder_5
		const placeholder_5 = this.add.image(497, 285, "placeholder");
		placeholder_5.scaleX = 0.2992899054086054;
		placeholder_5.scaleY = 0.25373372306906;

		// placeholder_6
		const placeholder_6 = this.add.image(601, 285, "placeholder");
		placeholder_6.scaleX = 0.2992899054086054;
		placeholder_6.scaleY = 0.25373372306906;

		// placeholder_7
		const placeholder_7 = this.add.image(705, 285, "placeholder");
		placeholder_7.scaleX = 0.2992899054086054;
		placeholder_7.scaleY = 0.25373372306906;

		// placeholder_8
		const placeholder_8 = this.add.image(81, 285, "placeholder");
		placeholder_8.scaleX = 0.2992899054086054;
		placeholder_8.scaleY = 0.25373372306906;

		// placeholder_9
		const placeholder_9 = this.add.image(185, 285, "placeholder");
		placeholder_9.scaleX = 0.2992899054086054;
		placeholder_9.scaleY = 0.25373372306906;

		// placeholder_10
		const placeholder_10 = this.add.image(289, 285, "placeholder");
		placeholder_10.scaleX = 0.2992899054086054;
		placeholder_10.scaleY = 0.25373372306906;

		// placeholder_11
		const placeholder_11 = this.add.image(81, 142, "placeholder");
		placeholder_11.scaleX = 0.2992899054086054;
		placeholder_11.scaleY = 0.25373372306906;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here
	deck = [];
	suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	tableau = [];
	foundationPiles = [[], [], [], []];
	foundationPilesStartX = 393;
	foundationPilesStartY = 80;

	// to create the deck
	createDeck() {
		for (let i = 0; i < this.suits.length; i++) {
			for (let j = 0; j < this.ranks.length; j++) {
				let card = {
					suit: this.suits[i],
					rank: this.ranks[j],
					frontImage: this.suits[i] + this.ranks[j],
					backImage: 'card-back'
				};
				this.deck.push(card);
			}
		}
	}

	// to shuffle the deck
	shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	// create the tableau piles
	createTableau() {
		for (let i = 0; i < 7; i++) {
			this.tableau[i] = [];
			for (let j = 0; j <= i; j++) {
				let card = this.deck.pop();
				if (j === i) {
					card.isFaceUp = true;
				} else {
					card.isFaceUp = false;
				}
				this.tableau[i].push(card);
			}
		}
	}

	counter = 0;

	// render the tableau piles
	renderTableau() {
		for (let i = 0; i < this.tableau.length; i++) {
			for (let j = 0; j < this.tableau[i].length; j++) {
				let card = this.tableau[i][j];
				let x = 82 + i * 104;
				let y = 287 + j * 20;

				if (card.isFaceUp) {
					let sprite = this.add.sprite(x, y, card.isFaceUp ? card.frontImage : card.backImage);
					sprite.displayHeight = 125;
					sprite.displayWidth = 90;
					sprite.setInteractive();
					this.setSpriteEvents(sprite, card, i);
				} else {
					let sprite = this.add.sprite(x, y, card.backImage);
					sprite.displayHeight = 125;
					sprite.displayWidth = 90;
					card.backImageSprite = sprite;
					let frontImageSprite = this.add.sprite(x, y, card.frontImage);
					frontImageSprite.displayHeight = 125;
					frontImageSprite.displayWidth = 90;
					frontImageSprite.visible = false;
					card.sprite = frontImageSprite;
				}
			}
		}
	}

	// sprite events
	setSpriteEvents(sprite, card) {
		sprite.card = card;
		card.sprite = sprite;
		let cardOrginalPositions = [];
		let originalPileIndex;
		let from;
		sprite.on('pointerdown', (pointer) => {
			// Keep track of the cards being dragged
			let k;
			for (let i = 0; i < this.tableau.length; i++) {
				for (let j = 0; j < this.tableau[i].length; j++) {
					let c = this.tableau[i][j];
					if (c === card) {
						k = j + 1;
						originalPileIndex = i;
						from = "tableau";
						break;
					}
				}
			}

			// if card is from the deck
			if (card === this.activeDeckCard) {
				console.log(" from deck");
				this.cardstomove = [card];
				cardOrginalPositions = [{
					x: card.sprite.x,
					y: card.sprite.y
				}];
				let cardToMove = this.cardstomove[0];
				cardToMove.sprite.x = pointer.x;
				cardToMove.sprite.y = pointer.y + 57;
				from = "deck";
			}

			// if card is from the tableau piles
			if (from === "tableau") {
				console.log(" from tableau");
				this.cardstomove = [card];
				while (k < this.tableau[originalPileIndex].length) {
					let nextCard = this.tableau[originalPileIndex][k];
					if (nextCard.isFaceUp) {
						this.cardstomove.push(nextCard);
					} else {
						break;
					}
					k++;
				}

				// Keep track of the original positions of the cards being dragged
				cardOrginalPositions = [];
				for (let l = 0; l < this.cardstomove.length; l++) {
					let cardToMove = this.cardstomove[l];
					cardOrginalPositions.push({
						x: cardToMove.sprite.x,
						y: cardToMove.sprite.y
					});
				}

				// remove the cards from the tableau
				for (let l = 0; l < this.cardstomove.length; l++) {
					let cardToMove = this.cardstomove[l];
					let index = this.tableau[originalPileIndex].indexOf(cardToMove);
					this.tableau[originalPileIndex].splice(index, 1);
				}

				// Update the position of the cards being dragged
				for (let l = 0; l < this.cardstomove.length; l++) {
					let cardToMove = this.cardstomove[l];
					cardToMove.sprite.depth = 5;
					cardToMove.sprite.x = pointer.x;
					cardToMove.sprite.y = pointer.y + (l * 20) + 57;
				}
			}
			this.cardstomove = this.cardstomove;
		}, this);
		sprite.on('pointerup', function (pointer) {
			let destPile = null;
			if (pointer.y >= 225) {
				destPile = this.getClosestValidPile(pointer.x, pointer.y, this.tableau);
				if (destPile) {
					// Move the cards to the new pile
					let x;
					let y;
					if (destPile.length > 0) {
						x = destPile[destPile.length - 1].sprite.x;
						y = destPile[destPile.length - 1].sprite.y;
					}
					else {
						x = 82 + this.tableau.indexOf(destPile) * 104;
						y = 287;
					}
					let dl = (destPile.length > 0) ? 1 : 0;
					for (let l = 0; l < this.cardstomove.length; l++) {
						let cardToMove = this.cardstomove[l];
						cardToMove.sprite.depth = 0;
						cardToMove.sprite.x = x;
						cardToMove.sprite.y = y + ((l + dl) * 20);
						destPile.push(cardToMove);
					}
					if (from === "tableau") {
						if (this.tableau[originalPileIndex].length > 0) {
							let c = this.tableau[originalPileIndex][this.tableau[originalPileIndex].length - 1];
							c.isFaceUp = true;
							c.sprite.visible = true;
							if (c.backImageSprite) c.backImageSprite.visible = false;
							c.sprite.setInteractive();
							this.setSpriteEvents(c.sprite, c, originalPileIndex);
						}
					}
				}
			} else {
				destPile = this.getClosestValidFoundationPile(pointer.x, pointer.y, this.foundationPiles);
				if (destPile) {
					if (this.cardstomove[0].rank === "A") {
						for (let k = 0; k < this.foundationPiles.length; k++) {
							if (this.foundationPiles[k].length === 1 && this.cardstomove[0].suit === this.foundationPiles[k][0].suit) {
								this.foundationPiles[k].pop();
							}
						}
					}
					let x;
					let y = this.foundationPilesStartY;
					if (destPile.length > 0) {
						x = destPile[destPile.length - 1].sprite.x;
					}
					else {
						x = this.foundationPilesStartX + this.foundationPiles.indexOf(destPile) * 104;
					}
					for (let l = 0; l < this.cardstomove.length; l++) {
						let cardToMove = this.cardstomove[l];
						cardToMove.sprite.depth = 0;
						cardToMove.sprite.x = x;
						cardToMove.sprite.y = y + 62;
						destPile.push(cardToMove);
					}
					if (from === "tableau") {
						if (this.tableau[originalPileIndex].length > 0) {
							let c = this.tableau[originalPileIndex][this.tableau[originalPileIndex].length - 1];
							c.isFaceUp = true;
							c.sprite.visible = true;
							if (c.backImageSprite) c.backImageSprite.visible = false;
							c.sprite.setInteractive();
							this.setSpriteEvents(c.sprite, c, originalPileIndex);
						}
					}
					let counter = 0;
					for (let k = 0; k < this.foundationPiles.length; k++) {
						if (this.foundationPiles[k].length === 13) {
							counter++;
						}
					}
					if (counter === 4) {
						alert("Congratulations! You win!");
						window.location.reload();
					}
				}
			}
			if (destPile && from === "deck") {
				console.log("deck index", this.deckIndex);
				this.deck.splice(this.deckIndex - 1, 1);
				if (this.deckIndex - 1 > 0) {
					this.deckIndex--;
					this.activeDeckCard = this.deck[this.deckIndex - 1];
				} else {
					this.activeDeckCard = null;
				}
			}
			if (!destPile && from === "tableau") {
				// Return the cards to their original positions
				for (let l = 0; l < this.cardstomove.length; l++) {
					let cardToMove = this.cardstomove[l];
					cardToMove.sprite.x = cardOrginalPositions[l].x;
					cardToMove.sprite.y = cardOrginalPositions[l].y;
					cardToMove.sprite.depth = 0;
					this.tableau[originalPileIndex].push(cardToMove);
				}
			}
			if (!destPile && from === "deck") {
				// Return the cards to their original positions
				for (let l = 0; l < this.cardstomove.length; l++) {
					let cardToMove = this.cardstomove[l];
					cardToMove.sprite.x = cardOrginalPositions[l].x;
					cardToMove.sprite.y = cardOrginalPositions[l].y;
					cardToMove.sprite.depth = this.deckIndex - 1;
				}
			}
			console.log("tableau", this.tableau);
			console.log("foundationPiles", this.foundationPiles);
			console.log("deck", this.deck);
			console.log("activeDeckCard", this.activeDeckCard);
			this.cardstomove = [];
		}, this);
	}

	cardstomove = [];
	onPointerMove() {
		this.input.on('pointermove', (pointer) => {
			for (let l = 0; l < this.cardstomove.length; l++) {
				let cardToMove = this.cardstomove[l];
				cardToMove.sprite.depth = 50;
				cardToMove.sprite.x = pointer.x;
				cardToMove.sprite.y = pointer.y + (l * 20) + 57;
			}
		}, this);
	}

	// to check if the card can be placed on the pile
	canMoveToPile(card, pile) {
		if (card.rank === 'K') {
			if (pile.length === 0) return true;
			if (pile.length > 0) return false;
		}

		// check if the card can be placed on the top of the pile
		let topCard = pile[pile.length - 1];
		if (topCard && topCard.isFaceUp && this.getColor(topCard.suit) !== this.getColor(card.suit) && this.ranks.indexOf(topCard.rank) === this.ranks.indexOf(card.rank) + 1) {
			return true;
		}
		return false;
	}

	// to get the destination pile
	getClosestValidPile(x, y, piles) {
		if (this.cardstomove.length === 0) return null;
		let closestPile = null;
		for (let i = 0; i < piles.length; i++) {
			let pile = piles[i];
			if (pile.length > 0 && !pile[pile.length - 1].isFaceUp) {
				continue;
			}
			let pileX = 82 + i * 104;
			let isInRange = x >= pileX - 45 && x <= pileX + 45 && y >= 225;
			if (isInRange && this.canMoveToPile(this.cardstomove[0], pile)) {
				closestPile = pile;
				break;
			}
		}
		return closestPile;
	}

	// to check if the card can be placed on the foundation pile
	canMoveToFoundation(card, pile) {
		if (pile.length === 0 && card.rank === 'A') {
			return true;
		} else if (pile.length > 0) {
			let topCard = pile[pile.length - 1];
			if (this.ranks.indexOf(topCard.rank) === this.ranks.indexOf(card.rank) - 1 && topCard.suit === card.suit) {
				return true;
			}
		}
		return false;
	}

	// to get the destination foundation pile
	getClosestValidFoundationPile(x, y, piles) {
		if (this.cardstomove.length > 1) return null;
		let closestPile = null;
		for (let i = 0; i < piles.length; i++) {
			let pileX = this.foundationPilesStartX + i * 104;
			let isInRange = x >= pileX - 45 && x <= pileX + 45 && y >= this.foundationPilesStartY && y <= this.foundationPilesStartY + 62;
			if (isInRange && this.canMoveToFoundation(this.cardstomove[0], piles[i])) {
				closestPile = piles[i];
				break;
			}
		}
		return closestPile;
	}

	// to get the color of the suit
	getColor(suit) {
		if (suit === 'clubs' || suit === 'spades') {
			return 'black';
		} else {
			return 'red';
		}
	}

	deckIndex = 0;
	activeDeckCard = null;
	// for deck
	Deck() {
		let deckOption = localStorage.getItem("deckOption");
		if (!deckOption) deckOption = 1;
		let backSprite;
		let retrySprite = this.add.sprite(81, 142, "retry");
		retrySprite.displayHeight = 110;
		retrySprite.displayWidth = 90;
		retrySprite.setInteractive();
		retrySprite.on('pointerdown', () => {
			if (this.deck.length === 0) return;
			this.deckIndex = 0;
			this.deck.forEach((card) => {
				card.sprite.visible = false;
				card.sprite.x = 81;
				card.sprite.depth = 0;
			});
			backSprite.visible = true;
			this.activeDeckCard = null;
		}, this);

		backSprite = this.add.sprite(81, 142, "card-back");
		backSprite.displayHeight = 125;
		backSprite.displayWidth = 90;
		backSprite.setInteractive();
		backSprite.on('pointerdown', () => {
			if (this.deckIndex < this.deck.length) {
				this.deck[this.deckIndex].sprite.visible = true;
				this.deck[this.deckIndex].sprite.depth = this.deckIndex;
				let i = this.deckIndex;
				let interval = setInterval(() => {
					this.deck[i].sprite.x += 5;
					if (this.deck[i].sprite.x >= 186) {
						clearInterval(interval);
					}
				}, 1);
				this.activeDeckCard = this.deck[this.deckIndex];
				this.deckIndex++;
			}
			if (this.deckIndex === this.deck.length) {
				backSprite.visible = false;
			}
		}, this);

		this.deck.forEach((card) => {
			card.sprite = this.add.sprite(81, 142, card.suit + card.rank);
			card.sprite.displayHeight = 125;
			card.sprite.displayWidth = 90;
			card.sprite.setInteractive();
			card.sprite.visible = false;
			card.isFaceUp = true;
			this.setSpriteEvents(card.sprite, card);
		});
	}

	create() {
		this.editorCreate();
		this.createDeck();
		this.deck = this.shuffle(this.deck);
		this.createTableau();
		this.renderTableau();
		this.Deck();
		this.onPointerMove();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
