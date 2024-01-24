class Pos {
	x
	y
}

function cpos(x, y) {
	let p = new Pos()
	p.x = x
	p.y = y
	return p
}

class Board {
	length
	height
	contents
	config
	getIndex(pos) {
		return this.contents[pos.x * this.length + pos.y]
	}
	setIndex(pos, x) {
		this.contents[pos.x * this.length + pos.y] = x
	}
	moveTo(src, dest) {
		let x = this.getIndex(src)
		if (x["flag"] == undefined) x["flag"] = 1
		else x["flag"] += 1
		this.setIndex(src, { id: this.config.ctrans["void"] })
		this.setIndex(dest, x)
	}
	tryMoveBy(pos, delta) { return this.config.move(pos, delta) }
	isVoid(pos) { return this.config.cells[this.getIndex(pos).id].type == "v" }
	isPiece(pos) { return this.config.cells[this.getIndex(pos).id].type == "p" }
	isAlly(pos, me) {
		let x = this.getIndex(pos)
		return this.config.cells[x.id].type == "p" && !this.config.rival(x.ownership, me)
	}
	isEnemy(pos, me) {
		let x = this.getIndex(pos)
		return this.config.cells[x.id].type == "p" && this.config.rival(x.ownership, me)
	}
	count() {
		let cnt = 0
		for (let x of this.contents)
			if (this.config.cells[x.id].type != "v")
				cnt += 1
		return cnt
	}
}

function initialize_chess(board, canvas) {
	let context = canvas.getContext("2d")
	let xw = Math.floor(canvas.width / board.length)
	let yw = Math.floor(canvas.height / board.height)
	let status = -1 // pending
	let src_cache = null
	let moves_cache = null
	canvas.addEventListener("click", function (event) {
		if (status == -1) return
		let x = Math.floor(event.offsetX / xw)
		let y = Math.floor(event.offsetY / yw)
		let pos = cpos(x, y)
		if (moves_cache != null && (board.isVoid(pos) || board.isEnemy(pos, status))) {
			for (let obj of moves_cache) {
				if (obj.target.x == pos.x && obj.target.y == pos.y) {
					let f = obj.on
					if (f == undefined) board.moveTo(src_cache, pos)
					else f()
					board.config.canvas_display(context, xw, yw)
					src_cache = null
					moves_cache = null
					status = board.config.turn_player_id(status)
					return
				}
			}
		}
		else if (board.isAlly(pos, status)) {
			board.config.canvas_display(context, xw, yw)
			board.config.draw_chosen(context, pos, xw, yw)
			let moves = board.config.cells[board.getIndex(pos).id].moves(board, pos)
			src_cache = pos
			if (moves == []) return
			for (let obj of moves) {
				let np = obj.target
				board.config.draw_target(context, np, xw, yw)
			}
			moves_cache = moves
		}
	})
	board.config.pieces_initialize()
	board.config.canvas_display(context, xw, yw)
	status = board.config.first_player_id
}
