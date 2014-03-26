/**
 * Class to encapsulate the main functionality plus the DOM manipulation
 */
function App() {
  this.goals = [];

  this.goalElement = document.getElementById('goal');

  // Assign the handler for the form submit
  document.getElementsByTagName('form')[0].onsubmit = this.addGoalHandler(this);

  // Autofocus to the text area when the page loads
  this.goalElement.autofocus = true;
}

/**
 * Simply renders the goals list and puts it into the body of the page
 */
App.prototype.renderGoalsTable = function() {
  var cell = null;

  for (var i = 0; i < 7; i++) {
    cell = document.getElementById('goal-cell-' + i);

    cell.innerHTML = this.goals[i];
  }
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
    that.goals.push(that.goalElement.value);
    that.goalElement.value = "";

    document.getElementById('goals').innerHTML =
      "<p>" + that.goals.join("</p><p>") + "</p>";

    if (that.goals.length >= 7) {
      that.renderGoalsTable();
      document.getElementById('printable-table').className = '';
      document.getElementById('goal-list').className = 'hidden';
    }

    return false;
  }
}
