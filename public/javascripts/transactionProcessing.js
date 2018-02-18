// https://stackoverflow.com/questions/6012823/how-to-make-html-table-cell-editable
// function addCategoryRow() {
// 	// adds new category row to dashboard/budget page
// 	// this is the first step in the process of creating a new category
// 	// alert('adding the category');
// 	console.log('added category row');
// 	$('.budget-table').append(`
// 		<tr class="new-category-row" >
// 		  <td><input type="text" value="new category" class="new-category"  /></td>
// 		  <td contenteditable="true" type="number">0</td>
// 		  <td>0</td>
// 		  <td>0</td>
// 		</tr>
// 		`);
//
// };


$(document).on('keyup', '.new-category', function (e) {
	// for the dashboard page
	// this creates a new category (for that user) with a categoryName and 0's for all other fields
	console.log($('.new-category').val());
    if (e.keyCode == 13) {
    	console.log($('.new-category').val());
    	//is input empty

        $.ajax({
			  type: "POST",
			  url: 'api/categories',
			  data: {categoryName: $('.new-category').val(),
			  	//-${new-category}.value,
			  budgeted: 0,
			  activity: 0,
			  available: 0}, //or e.target.value
			  dataType: 'json',
		});        
    }
    // $(".new-category-row").addClass('category-row');
    // $(".new-category-row").removeClass('new-category-row');
    // $(".new-category").removeClass('new-category');
});

$(document).on('click', '.category-budget-span', function() {

	console.log('in the removal of hidden function');
	$('.category-budget-span').addClass('hidden');
	$('.category-row-budgeted-input').removeClass('hidden');

});

// UPDATE BUDGET OF CATEGORY ON ENTER
$(document).on('keydown', '.category-row-budgeted-input', function (e) {
	console.log('inside category.budget UPDATE');
	console.log(e.target);
	// console.log();
	if (e.keyCode == 13) {
		console.log('inside category.budget UPDATE');
        console.log($(e.target).val())
	}
});

$(document).on('keyup', '.category-row-categoryName', function (e) {
	// for the dashboard page:
	// this updates a categoryName
	// NOTE: this will be a little more complicated, because you'll need to propagate the changed name
	// down to all transactions with that label.

}); // end of document.on

$(document).on('keyup', '.category-row', function (e) {
	// for the dashboard page:
	// this deletes a whole category
	// NOTE: this will be a little more complicated because you'll need to switch all transactions
	// with this category to having no assigned category

}); // end of document.on



$('.category-dropdown').change(function() {
	// alert('inside category change for transaction - transaction processing category dropdown change func');
	// for the transactions page: with the dropdown select box for adding a transaction
	// this updates a transaction with an assigned category
	//console.log(this.parent('tr').data('id'));
	window.mythis=this;
	let that = $(this);
	let url = 'api/transactions/' + $(this).parent().parent().data('id') + '/category'
	console.log(url)
	let category = $(this).data('option')
	console.log('this is the category:');
	console.log(category);
	 $.ajax({
			  type: "PUT",
			  url: url,
			  data: { category: 'groceries'}, 
			  dataType: 'json',		
			  success: function() {
			  	console.log('successful!');
			  	var url = 'api/categories/';
			  	$.ajax({
			  		type: 'PUT',
			  		url: url
			  	})
			  } // end of success

		 }); // end of ajax call  
}); // end of $('.transaction-row-category').change(function() {


