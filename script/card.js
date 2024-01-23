class Card {
	icon
	properties
	actions
}

function register_card(object) {
	let card = new Card()
	card.properties = object.properties
	card.actions = object.actions
	return card
}

class CardList {
	size
	list
	clear() {
		this.list = new Array(this.size)
	}
	desert(id) {
		this.list[id] = undefined
	}
}

function number_reduce(cardlist, cardlistid, card, _, reduce = 1) {
	if (card.count > reduce)
		card.count -= reduce
	else
		cardlist.desert(cardlistid)
}
