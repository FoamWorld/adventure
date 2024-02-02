register_card({
	properties: { count: 1, title: "石头" },
	actions: [
		{
			name: "丢弃",
			bindKey: ['q', 'Q'],
			on: function (cardlist, cardlistid, card, objects) {
				number_reduce(cardlist, cardlistid, card, objects)
				objects.time.consume(1)
			}
		},
		{
			name: "投掷",
			bindKey: ['t', 'T', "drag"],
			on: function (cardlist, cardlistid, card, objects) {
				number_reduce(cardlist, cardlistid, card, objects, 1)
				objects.target.sufferDamage(5)
				objects.time.consume(1)
			}
		}
	]
})
