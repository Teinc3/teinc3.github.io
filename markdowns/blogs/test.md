## Test Blog
*Last updated: 08/03/2024*

This is a test blog. It is a markdown file that is being used to test the blog functionality of the website.

Yeah thats basically it. I hope I don't waste your time.

Ha! And you want more. OK, I'll just paste one of my articles here

### Should I Disable Crystal Boxes?
Main article: Crystal boxes

#### Introduction

In **PRO Battles** there are many customizable options that alter the behavior of battles, and one of them controls whether **Crystal boxes** (including Gold Boxes) drop on the map. It might seem counterintuitive to disable crystal boxes from the map since it appears that you lose out on crystals. However, that might not be the case, as the battle fund increases at a 50% faster rate if the option is left out.

Obviously, if you pay much attention to collecting as many crystal boxes as possible while in-game, or if you believe your chances of catching the Gold box are much higher than others, then it's always a good idea to participate in battles with this option enabled. Note that the opposite also applies: if you seldom care about crystal boxes in maps, or if you don't catch Gold boxes as often as other players do, try opting out of battles with crystal boxes enabled.

For players with a balanced playstyle, it might be difficult to obtain an objective answer on whether the option should be disabled or not. To answer this question, we can consider the average amount of crystals earned in battles on a normal day.

#### Calculations

We begin by letting the amount of crystals you earn from the battle fund of a battle with no fund multipliers be *N*, and the number of Dropzones for Crystal boxes in the Maps as *D*.

- With the Crystal boxes option **disabled**, the fund is increased by an additional 0.5N. As there are no other multipliers, the total battle fund would be 1.5*N*.

- With the Crystal boxes option **enabled**, the battle fund obtained is *N*. However, note that Crystal boxes and Gold boxes also have a chance of dropping on the map.
   - Gold boxes have around a 1/7000 chance of dropping per added battle fund. On average, for every *N* fund made, Gold boxes of a total value of *N*/7 will drop.
   - Crystal boxes have around a 1% chance of dropping in every single drop zone on the map per added battle fund. On average, for every *N* fund made, crystal boxes of a total value of *DN*/10 will drop.
   - This brings the total amount earned from the battle to 8*N*/7 + *DN*/10.

To make disabling crystal boxes worth it, the additional 50% increase in the base battle fund must be greater than the total amount of funds with Crystal/Gold boxes. We can set up an inequality:

- 1.5*N* > *DN*/10 + 8*N*/7
- Solving the inequality, we have *D* < 25/7 (3.57...)

And our question is now answered. For smaller maps with fewer than 4 drop zones (such as Arena with 3 or Island with only 2), it is more beneficial to disable the Crystal boxes option, as increasing the battle fund gives more crystals. For medium or larger maps, remember to enable crystal boxes, especially if your luck in catching the Gold box is not that abysmal!

#### General Formula

In festivities, many parameters in battles may be altered (such as fund multipliers, gold value, or drop rates), making our above formula obsolete. 

Note that fund multipliers do not affect each other but only add on the base fund. If you play on a day with 2x funds in a battle without Crystal boxes, the total battle fund would only be 2.5*N* as opposed to 3*N*.

We further assign the Gold box value multiplier as *G*, the Gold box dropping rate multiplier as *R*, and the Fund multiplier as *F*.

- With the crystal boxes option **disabled**, the total fund accumulated would be (*F* + 0.5)*N*.

- With the crystal boxes option **enabled**, the battle fund accumulated would be *FN*.
   - Gold boxes have a probability of *R*/7000 chance of dropping, with a value of 1000*G*. On average, for every *N* fund made, Gold boxes of a total value of *NRG*/7 will drop.
   - Crystal boxes have around a 1% chance of dropping in every single drop zone on the map per added battle fund. On average, for every *N* fund made, crystal boxes of a total value of *DN*/10 will drop.
   - This brings the total amount earned from the battle to (1 + *RG*/7 + *D*/10)*FN*.

Setting up an inequality again, we have

- (*F* + 0.5) > (1 + *RG*/7 + *D*/10)*F*
- Solving the inequality, we have *D* < 10 - 10*RG*/7 - 5/*F*

As an example, suppose that a player wants to grind Island during a festivity with 2x funds, 2x Golds, and with 2x gold value. Is it worth enabling Crystal boxes? Setting *R*, *G*, and *F* as 2, we have:

- 10 - 10(2*2)/7 - 5/2 = 1.78... < 2

As Island has 2 drop zones, which is greater than 1.78, enabling Crystal boxes during an event gives an overall benefit! In fact, this holds true for basically every map in the game.
