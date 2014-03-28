/**
 * Class to encapsulate the main functionality plus the DOM manipulation
 */
function App() {
  this.goals = [];

  this.goalElement  = $('#goal');
  this.goalList     = $('#goals');
  this.table        = $('#printable-table');
  this.list         = $('#goal-list');

  // Assign the handler for the form submit
  $('form').submit(this.addGoalHandler(this));

  $('#options-cell').hover(function(elem) {
    $(elem.target).find('.layer').toggle();
  });

  // Autofocus to the text area when the page loads
  this.goalElement.focus();
}

/**
 * Simply renders the goals list and puts it into the body of the page
 */
App.prototype.renderGoalsTable = function() {
  var cell = null;

  for (var i = 0; i < 7; i++) {
    $('#goal-cell-' + i).html(this.goals[i]);
  }
}

/**
 * Clears the goals and shows the initial state of the page
 */
App.prototype.clear = function() {
  this.goals = [];

  this.goalList.html('');

  this.table.hide();
  this.list.show();

  $('#options-cell .layer').toggle();
}

/**
 * Metafunction that returns another function with access to a 'that' var which
 * points to the original object. Probably worth to FIXME
 *
 * @param [App] that
 *
 * @return [Function]
 */
App.prototype.addGoalHandler = function(that) {
  /**
   * Handler for the basic form. This will be triggered any time the 'Enter' key
   * is pressed while focused on the text field
   */
  return function() {
    that.goals.push(that.goalElement.val());
    that.goalElement.val('');

    that.goalList.html("<p>" + that.goals.join("</p><p>") + "</p>");

    if (that.goals.length >= 7) {
      that.renderGoalsTable();
      that.table.show();
      that.list.hide();
    }

    return false;
  }
}
