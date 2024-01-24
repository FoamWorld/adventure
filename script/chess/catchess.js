function cat_svg(color, color2, direction) {
	let svg = new Image()
	let ml = window.btoa(`<svg xmlns="http://www.w3.org/2000/svg">
	<path fill="${color}" d="M 418.606,150 A 200 200 0 0 ${direction} 61.394,330 M 61.394,330 L 110,270 L 180,270 L 240,330 L 240,150 L 300,210 L 370,210 L 418.606,150 Z"/>
	${direction == 1 ?
			`<circle cx="300" cy="260" r="10" fill="${color2}"/><circle cx="370" cy="260" r="10" fill="${color2}"/>` :
			`<circle cx="180" cy="220" r="10" fill="${color2}"/><circle cx="110" cy="220" r="10" fill="${color2}"/>`
		}
	</svg>`)
	svg.src = "data:image/svg+xml;base64," + ml
	return svg
}

const cat_svg_cache = [
	[null, cat_svg("white", "black", 0), cat_svg("black", "orange", 0), cat_svg("orange", "white", 0)],
	[null, cat_svg("white", "black", 1), cat_svg("black", "orange", 1), cat_svg("orange", "white", 1)]
]
var catchessRules = {
	moveWhiteCat: function (b, pos) {
		let list = []
		for (let rx = -1; rx <= 1; rx++) {
			for (let ry = -1; ry <= 1; ry++) {
				if (rx == 0 && ry == 0) continue
				let np = b.tryMoveBy(pos, cpos(rx, ry))
				if (np == null)
					continue
				if (b.isPiece(np)) {
					let np2 = b.tryMoveBy(pos, cpos(rx * 2, ry * 2))
					if (np2 == null)
						continue
					if (b.isVoid(np2)) {
						list.push({
							target: np2,
							on: function () {
								let x = b.getIndex(np)
								x.id = x.id == 3 ? 1 : x.id + 1
								b.moveTo(pos, np2)
							}
						})
					}
				}
			}
		}
		return list
	},
	moveBlackCat: function (b, pos) {
		let me = b.getIndex(pos).ownership
		let list = []
		let front = b.config.front(me)
		let flag2 = false
		let np = b.tryMoveBy(pos, cpos(0, front))
		if (np != null && b.isVoid(np)) { // front
			flag2 = true
			list.push({ target: np })
		}
		np = b.tryMoveBy(pos, cpos(1, front)) // front-l
		if (np != null && b.isEnemy(np, me))
			list.push({ target: np })
		np = b.tryMoveBy(pos, cpos(-1, front)) // front-r
		if (np != null && b.isEnemy(np, me))
			list.push({ target: np })
		let flag = b.getIndex(pos).flag == undefined
		if (flag && flag2) {
			np = b.tryMoveBy(pos, cpos(0, front * 2))
			if (np != null && b.isVoid(np))
				list.push({ target: np })
		}
		return list
	},
	moveOrangeCat: function (b, pos) {
		let me = b.getIndex(pos).ownership
		let list = []
		for (let i = 0; i < 4; i++) {
			let rx = [0, 0, 1, -1][i]
			let ry = [1, -1, 0, 0][i]
			let np = b.tryMoveBy(pos, cpos(rx, ry))
			if (np == null || b.isAlly(np, me))
				continue
			list.push({ target: np })
		}
		return list
	},

	__init__: function () {
		let board = new Board()
		board.length = 8
		board.height = 8
		board.contents = new Array(64)
		board.config = {
			"ctrans": { "void": 0, "white": 1, "black": 2, "orange": 3 },
			"cells": [
				{ type: "v", },
				{ type: "p", moves: this.moveWhiteCat },
				{ type: "p", moves: this.moveBlackCat },
				{ type: "p", moves: this.moveOrangeCat },
			],
			"rival": function (a, b) { return a != b },
			"move": function (pos, delta) {
				let np = cpos(pos.x + delta.x, pos.y + delta.y)
				if (np.x < 0 || np.x >= 8) return null
				if (np.y >= 8) np.y -= 8
				if (np.y < 0) np.y += 8
				return np
			},
			"front": function (ownership) { return ownership == 0 ? 1 : -1 },
			"first_player_id": 1,
			"turn_player_id": function (o) { return 1 - o },
			"pieces_initialize": function () {
				let contents = board.contents
				for (let i = 0; i < 8; i++) {
					let i8 = i * 8
					contents[i8 + 0] = { id: 1, ownership: 0 }
					contents[i8 + 1] = { id: 2, ownership: 0 }
					contents[i8 + 2] = { id: 0 }
					contents[i8 + 3] = { id: 0 }
					contents[i8 + 4] = { id: 0 }
					contents[i8 + 5] = { id: 0 }
					contents[i8 + 6] = { id: 2, ownership: 1 }
					contents[i8 + 7] = { id: 1, ownership: 1 }
				}
			},
			"canvas_display": function (ctx, xw, yw) {
				ctx.clearRect(0, 0, xw * 8, yw * 8)
				ctx.fillStyle = "#C19B6F"
				ctx.fillRect(0, 0, xw * 8, yw * 8)
				for (let i = 0; i < 8; i++) {
					for (let j = 0; j < 8; j++) {
						let obj = board.contents[i * 8 + j]
						if (obj.id == 0) continue
						ctx.drawImage(cat_svg_cache[obj.ownership][obj.id], i * xw, j * yw, xw, yw)
					}
				}
			},
			"draw_chosen": function (ctx, pos, xw, yw) {
				ctx.fillStyle = "#FFFF004F"
				ctx.fillRect(pos.x * xw, pos.y * yw, xw, yw)
			},
			"draw_target": function (ctx, pos, xw, yw) {
				ctx.fillStyle = "#0000FF20"
				ctx.fillRect(pos.x * xw, pos.y * yw, xw, yw)
			},
		}
		return board
	}
}
