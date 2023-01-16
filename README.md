Komputer Store

What is Komputer Store?
	A store where the user can work to earn their pay, deposit their pay, take loans, pay off loans, purchase, and refund laptops.

What technologies were used?
	The project was created using HTML, vanilla JS, and Tailwind CSS.
	I chose to stick to a simple design and focus on functionality which made Tailwind CSS and it's, in my opinion, more readable inline-styling 
	(compared to vanilla CSS) a suitable fit for the project. 
	
What challenges were faced?
	The app.js file turned out quite large and cluttered which lead me to make use of modules. This allowed me to export the main functionality of the bank, work, and 
	laptop showcase sections to their own separate files. I.e. all functionality that utilized more than one of the previously mentioned sections were kept in the
	app.js file. 
	
Feature breakdown
	Bank
		Take Loan: Grants you a loan IF the requested loan is twice, or less than twice, of your current bank balance.
		Repay Loan: Repays the loan using ALL of your current pay. The remaining pay will go to your bank balance.
	Work
		Work: Adds 100 SEK to your pay.
		Bank: Transfers pay to your bank account. If you have an outstanding loan: 10% of the pay will go towards it.
	Laptop showcase
		Laptop dropdown: Allows you to choose which laptop to display.
		BUY NOW: Allows you to purchase a laptop, assuming your bank balance covers the price.
	Inventory
		Refund: Allows you to refund the laptops you have chosen. The refund goes to your bank account. 
