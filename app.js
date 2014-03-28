/**
 * Class to encapsulate the main functionality plus the DOM manipulation
 */
function App() {
  this.goals = [];

  this.goalList = $('#goals');

  // Assign the handler for the form submit
  $('form').submit(this.addGoalHandler(this));

  $('#options-cell').hover(function(elem) {
    $(elem.target).find('.layer').toggle();
  });
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

  $('.page').toggle();

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
    var goal = $('#goal');

    that.goals.push(goal.val());
    goal.val('');

    that.goalList.html("<p>" + that.goals.join("</p><p>") + "</p>");

    if (that.goals.length >= 7) {
      that.renderGoalsTable();

      $('.page').toggle();
    }

    return false;
  }
}
