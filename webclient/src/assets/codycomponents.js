

// File#: _1_floating-label
// Usage: codyhouse.co/license
const floatingLabels = function() {

	var floatingLabels = document.getElementsByClassName('floating-label');

	if( floatingLabels.length > 0 ) {
		var placeholderSupported = checkPlaceholderSupport(); // check if browser supports :placeholder
		for(var i = 0; i < floatingLabels.length; i++) {
			(function(i){initFloatingLabel(floatingLabels[i])})(i);
		}

		function initFloatingLabel(element) {
			if(!placeholderSupported) { // :placeholder is not supported -> show label right away

				Util.addClass(element.getElementsByClassName('form-label')[0], 'form-label--floating');
				return;
			}

			var input = element.getElementsByClassName('form-control')[0];
			input.addEventListener('input', function(event){
				resetFloatingLabel(element, input);
			});
		};

		function resetFloatingLabel(element, input) { // show label if input is not empty
			Util.toggleClass(element.getElementsByClassName('form-label')[0], 'form-label--floating', input.value.length > 0);
		};

		function checkPlaceholderSupport() {
			var input = document.createElement('input');
    	return ('placeholder' in input);
		};
	} else {

  }
};



// File#: _2_flexi-header
// Usage: codyhouse.co/license
const flexiHeader = function() {
  var flexHeader = document.getElementsByClassName('js-f-header');
	if(flexHeader.length > 0) {
		var menuTrigger = flexHeader[0].getElementsByClassName('js-anim-menu-btn')[0],
			firstFocusableElement = getMenuFirstFocusable();

		// we'll use these to store the node that needs to receive focus when the mobile menu is closed
		var focusMenu = false;

		resetFlexHeaderOffset();
		setAriaButtons();

		menuTrigger.addEventListener('anim-menu-btn-clicked', function(event){
			toggleMenuNavigation(event.detail);
		});

		// listen for key events
		window.addEventListener('keyup', function(event){
			// listen for esc key
			if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
				// close navigation on mobile if open
				if(menuTrigger.getAttribute('aria-expanded') == 'true' && isVisible(menuTrigger)) {
					focusMenu = menuTrigger; // move focus to menu trigger when menu is close
					menuTrigger.click();
				}
			}
			// listen for tab key
			if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
				// close navigation on mobile if open when nav loses focus
				if(menuTrigger.getAttribute('aria-expanded') == 'true' && isVisible(menuTrigger) && !document.activeElement.closest('.js-f-header')) menuTrigger.click();
			}
		});

		// detect click on a dropdown control button - expand-on-mobile only
		flexHeader[0].addEventListener('click', function(event){
			var btnLink = event.target.closest('.js-f-header__dropdown-control');
			if(!btnLink) return;
			!btnLink.getAttribute('aria-expanded') ? btnLink.setAttribute('aria-expanded', 'true') : btnLink.removeAttribute('aria-expanded');
		});

		// detect mouseout from a dropdown control button - expand-on-mobile only
		flexHeader[0].addEventListener('mouseout', function(event){
			var btnLink = event.target.closest('.js-f-header__dropdown-control');
			if(!btnLink) return;
			// check layout type
			if(getLayout() == 'mobile') return;
			btnLink.removeAttribute('aria-expanded');
		});

		// close dropdown on focusout - expand-on-mobile only
		flexHeader[0].addEventListener('focusin', function(event){
			var btnLink = event.target.closest('.js-f-header__dropdown-control'),
				dropdown = event.target.closest('.f-header__dropdown');
			if(dropdown) return;
			if(btnLink && btnLink.hasAttribute('aria-expanded')) return;
			// check layout type
			if(getLayout() == 'mobile') return;
			var openDropdown = flexHeader[0].querySelector('.js-f-header__dropdown-control[aria-expanded="true"]');
			if(openDropdown) openDropdown.removeAttribute('aria-expanded');
		});

		// listen for resize
		var resizingId = false;
		window.addEventListener('resize', function() {
			clearTimeout(resizingId);
			resizingId = setTimeout(doneResizing, 500);
		});

		function getMenuFirstFocusable() {
			var focusableEle = flexHeader[0].getElementsByClassName('f-header__nav')[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
				firstFocusable = false;
			for(var i = 0; i < focusableEle.length; i++) {
				if( focusableEle[i].offsetWidth || focusableEle[i].offsetHeight || focusableEle[i].getClientRects().length ) {
					firstFocusable = focusableEle[i];
					break;
				}
			}

			return firstFocusable;
    };

    function isVisible(element) {
      return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
		};

		function doneResizing() {
			if( !isVisible(menuTrigger) && Util.hasClass(flexHeader[0], 'f-header--expanded')) {
				menuTrigger.click();
			}
			resetFlexHeaderOffset();
		};

		function toggleMenuNavigation(bool) { // toggle menu visibility on small devices
			Util.toggleClass(document.getElementsByClassName('f-header__nav')[0], 'f-header__nav--is-visible', bool);
			Util.toggleClass(flexHeader[0], 'f-header--expanded', bool);
			menuTrigger.setAttribute('aria-expanded', bool);
			if(bool) firstFocusableElement.focus(); // move focus to first focusable element
			else if(focusMenu) {
				focusMenu.focus();
				focusMenu = false;
			}
		};

		function resetFlexHeaderOffset() {
			// on mobile -> update max height of the flexi header based on its offset value (e.g., if there's a fixed pre-header element)
			document.documentElement.style.setProperty('--f-header-offset', flexHeader[0].getBoundingClientRect().top+'px');
		};

		function setAriaButtons() {
			var btnDropdown = flexHeader[0].getElementsByClassName('js-f-header__dropdown-control');
			for(var i = 0; i < btnDropdown.length; i++) {
				var id = 'f-header-dropdown-'+i,
					dropdown = btnDropdown[i].nextElementSibling;
				if(dropdown.hasAttribute('id')) {
					id = dropdown.getAttribute('id');
				} else {
					dropdown.setAttribute('id', id);
				}
				btnDropdown[i].setAttribute('aria-controls', id);
			}
		};

		function getLayout() {
			return getComputedStyle(flexHeader[0], ':before').getPropertyValue('content').replace(/\'|"/g, '');
		};
	}
};


// File#: _1_anim-menu-btn
// Usage: codyhouse.co/license
const animatedMenuButton = function() {
	var menuBtns = document.getElementsByClassName('js-anim-menu-btn');
	if( menuBtns.length > 0 ) {
		for(var i = 0; i < menuBtns.length; i++) {(function(i){
			initMenuBtn(menuBtns[i]);
		})(i);}

		function initMenuBtn(btn) {
			btn.addEventListener('click', function(event){
				event.preventDefault();
				var status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
				Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
				// emit custom event
				var event = new CustomEvent('anim-menu-btn-clicked', {detail: status});
				btn.dispatchEvent(event);
			});
		};
	}
};


// File#: _1_password
// Usage: codyhouse.co/license
const passwordComponent = function() {
	var Password = function(element) {
		this.element = element;
		this.password = this.element.getElementsByClassName('js-password__input')[0];
		this.visibilityBtn = this.element.getElementsByClassName('js-password__btn')[0];
		this.visibilityClass = 'password--text-is-visible';
		this.initPassword();
	};

	Password.prototype.initPassword = function() {
		var self = this;
		//listen to the click on the password btn
		this.visibilityBtn.addEventListener('click', function(event) {
			//if password is in focus -> do nothing if user presses Enter
			if(document.activeElement === self.password) return;
			event.preventDefault();
			self.togglePasswordVisibility();
		});
	};

	Password.prototype.togglePasswordVisibility = function() {
		var makeVisible = !Util.hasClass(this.element, this.visibilityClass);
		//change element class
		Util.toggleClass(this.element, this.visibilityClass, makeVisible);
		//change input type
		(makeVisible) ? this.password.setAttribute('type', 'text') : this.password.setAttribute('type', 'password');
	};

	//initialize the Password objects
	var passwords = document.getElementsByClassName('js-password');
	if( passwords.length > 0 ) {
		for( var i = 0; i < passwords.length; i++) {
			(function(i){new Password(passwords[i]);})(i);
		}
	};
};




// File#: _1_sub-navigation
// Usage: codyhouse.co/license
const profileSubnav = function() {
  var SideNav = function(element) {
    this.element = element;
    this.control = this.element.getElementsByClassName('js-subnav__control');
    this.navList = this.element.getElementsByClassName('js-subnav__wrapper');
    this.closeBtn = this.element.getElementsByClassName('js-subnav__close-btn');
    this.firstFocusable = getFirstFocusable(this);
    this.showClass = 'subnav__wrapper--is-visible';
    this.collapsedLayoutClass = 'subnav--collapsed';
    initSideNav(this);
  };

  function getFirstFocusable(sidenav) { // get first focusable element inside the subnav
    if(sidenav.navList.length == 0) return;
    var focusableEle = sidenav.navList[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
        firstFocusable = false;
    for(var i = 0; i < focusableEle.length; i++) {
      if( focusableEle[i].offsetWidth || focusableEle[i].offsetHeight || focusableEle[i].getClientRects().length ) {
        firstFocusable = focusableEle[i];
        break;
      }
    }

    return firstFocusable;
  };

  function initSideNav(sidenav) {
    checkSideNavLayout(sidenav); // switch from --compressed to --expanded layout
    initSideNavToggle(sidenav); // mobile behavior + layout update on resize
  };

  function initSideNavToggle(sidenav) {
    // custom event emitted when window is resized
    sidenav.element.addEventListener('update-sidenav', function(event){
      checkSideNavLayout(sidenav);
    });

    // mobile only
    if(sidenav.control.length == 0 || sidenav.navList.length == 0) return;
    sidenav.control[0].addEventListener('click', function(event){ // open sidenav
      openSideNav(sidenav, event);
    });
    sidenav.element.addEventListener('click', function(event) { // close sidenav when clicking on close button/bg layer
      if(event.target.closest('.js-subnav__close-btn') || Util.hasClass(event.target, 'js-subnav__wrapper')) {
        closeSideNav(sidenav, event);
      }
    });
  };

  function openSideNav(sidenav, event) { // open side nav - mobile only
    event.preventDefault();
    sidenav.selectedTrigger = event.target;
    event.target.setAttribute('aria-expanded', 'true');
    Util.addClass(sidenav.navList[0], sidenav.showClass);
    sidenav.navList[0].addEventListener('transitionend', function cb(event){
      sidenav.navList[0].removeEventListener('transitionend', cb);
      sidenav.firstFocusable.focus();
    });
  };

  function closeSideNav(sidenav, event, bool) { // close side sidenav - mobile only
    if( !Util.hasClass(sidenav.navList[0], sidenav.showClass) ) return;
    if(event) event.preventDefault();
    Util.removeClass(sidenav.navList[0], sidenav.showClass);
    if(!sidenav.selectedTrigger) return;
    sidenav.selectedTrigger.setAttribute('aria-expanded', 'false');
    if(!bool) sidenav.selectedTrigger.focus();
    sidenav.selectedTrigger = false;
  };

  function checkSideNavLayout(sidenav) { // switch from --compressed to --expanded layout
    var layout = getComputedStyle(sidenav.element, ':before').getPropertyValue('content').replace(/\'|"/g, '');
    if(layout != 'expanded' && layout != 'collapsed') return;
    Util.toggleClass(sidenav.element, sidenav.collapsedLayoutClass, layout != 'expanded');
  };

  var sideNav = document.getElementsByClassName('js-subnav'),
    SideNavArray = [],
    j = 0;
  if( sideNav.length > 0) {
    for(var i = 0; i < sideNav.length; i++) {
      var beforeContent = getComputedStyle(sideNav[i], ':before').getPropertyValue('content');
      if(beforeContent && beforeContent !='' && beforeContent !='none') {
        j = j + 1;
      }
      (function(i){SideNavArray.push(new SideNav(sideNav[i]));})(i);
    }

    if(j > 0) { // on resize - update sidenav layout
      var resizingId = false,
        customEvent = new CustomEvent('update-sidenav');
      window.addEventListener('resize', function(event){
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 300);
      });

      function doneResizing() {
        for( var i = 0; i < SideNavArray.length; i++) {
          (function(i){SideNavArray[i].element.dispatchEvent(customEvent)})(i);
        };
      };

      (window.requestAnimationFrame) // init table layout
        ? window.requestAnimationFrame(doneResizing)
        : doneResizing();
    }

    // listen for key events
    window.addEventListener('keyup', function(event){
      if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {// listen for esc key - close navigation on mobile if open
        for(var i = 0; i < SideNavArray.length; i++) {
          (function(i){closeSideNav(SideNavArray[i], event);})(i);
        };
      }
      if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) { // listen for tab key - close navigation on mobile if open when nav loses focus
        if( document.activeElement.closest('.js-subnav__wrapper')) return;
        for(var i = 0; i < SideNavArray.length; i++) {
          (function(i){closeSideNav(SideNavArray[i], event, true);})(i);
        };
      }
    });
  }
}



// File#: _2_pricing-table-v2
// Usage: codyhouse.co/license
const priceTable = function() {
	var pTable = document.getElementsByClassName('js-p-table-v2');
	if(pTable.length > 0) {
		for(var i = 0; i < pTable.length; i++) {
			(function(i){ addPTableEvent(pTable[i]);})(i);
		}

		function addPTableEvent(element) {
			// switcher monthly/yearly plan
      var pSwitch = element.getElementsByClassName('js-p-table-v2__switch');
			if(pSwitch.length > 0) {
				pSwitch[0].addEventListener('change', function(event) {
          Util.toggleClass(element, 'p-table-v2--monthly-plan', (event.target.value == 'monthly'));
				});
			}

			// volume selector for multiple-users plan
			var pSelect = element.getElementsByClassName('js-p-table-v2__select'),
				pVolumeBtn = element.getElementsByClassName('js-p-table-v2__btn-volume');
			if(pSelect.length > 0 && pVolumeBtn.length > 0) {
				var volumeOptions = pVolumeBtn[0].querySelectorAll('[data-value]');
				updatePTableTeam(volumeOptions, pSelect[0].value); // init multiple-users plan price
				pSelect[0].addEventListener('change', function(event) {
          updatePTableTeam(volumeOptions, pSelect[0].value);
				});
			}
		}

		function updatePTableTeam(volumeOpt, value) {
			for(var i = 0; i < volumeOpt.length; i++) {
				volumeOpt[i].getAttribute('data-value') == value
					? volumeOpt[i].removeAttribute('style')
					: volumeOpt[i].setAttribute('style', 'display: none;');
			}
		};
	}
};

// File#: _1_custom-select
// Usage: codyhouse.co/license
const customSelect = function() {
  // NOTE: you need the js code when using the --custom-dropdown/--minimal variation of the Custom Select component. Default version does nor require JS.

  var CustomSelect = function(element) {
    this.element = element;
    this.select = this.element.getElementsByTagName('select')[0];
    this.optGroups = this.select.getElementsByTagName('optgroup');
    this.options = this.select.getElementsByTagName('option');
    this.selectedOption = getSelectedOptionText(this);
    this.selectId = this.select.getAttribute('id');
    this.trigger = false;
    this.dropdown = false;
    this.customOptions = false;
    this.arrowIcon = this.element.getElementsByTagName('svg');
    this.label = document.querySelector('[for="'+this.selectId+'"]');

    this.optionIndex = 0; // used while building the custom dropdown

    initCustomSelect(this); // init markup
    initCustomSelectEvents(this); // init event listeners
  };

  function initCustomSelect(select) {
    // create the HTML for the custom dropdown element
    select.element.insertAdjacentHTML('beforeend', initButtonSelect(select) + initListSelect(select));

    // save custom elements
    select.dropdown = select.element.getElementsByClassName('js-select__dropdown')[0];
    select.trigger = select.element.getElementsByClassName('js-select__button')[0];
    select.customOptions = select.dropdown.getElementsByClassName('js-select__item');

    // hide default select
    Util.addClass(select.select, 'is-hidden');
    if(select.arrowIcon.length > 0 ) select.arrowIcon[0].style.display = 'none';

    // place dropdown
    placeDropdown(select);
  };

  function initCustomSelectEvents(select) {
    // option selection in dropdown
    initSelection(select);

    // click events
    select.trigger.addEventListener('click', function(){
      toggleCustomSelect(select, false);
    });
    if(select.label) {
      // move focus to custom trigger when clicking on <select> label
      select.label.addEventListener('click', function(){
        Util.moveFocus(select.trigger);
      });
    }
    // keyboard navigation
    select.dropdown.addEventListener('keydown', function(event){
      if(event.keyCode && event.keyCode == 38 || event.key && event.key.toLowerCase() == 'arrowup') {
        keyboardCustomSelect(select, 'prev', event);
      } else if(event.keyCode && event.keyCode == 40 || event.key && event.key.toLowerCase() == 'arrowdown') {
        keyboardCustomSelect(select, 'next', event);
      }
    });
    // native <select> element has been updated -> update custom select as well
    select.element.addEventListener('select-updated', function(event){
      resetCustomSelect(select);
    });
  };

  function toggleCustomSelect(select, bool) {
    var ariaExpanded;
    if(bool) {
      ariaExpanded = bool;
    } else {
      ariaExpanded = select.trigger.getAttribute('aria-expanded') == 'true' ? 'false' : 'true';
    }
    select.trigger.setAttribute('aria-expanded', ariaExpanded);
    if(ariaExpanded == 'true') {
      var selectedOption = getSelectedOption(select);
      Util.moveFocus(selectedOption); // fallback if transition is not supported
      select.dropdown.addEventListener('transitionend', function cb(){
        Util.moveFocus(selectedOption);
        select.dropdown.removeEventListener('transitionend', cb);
      });
      placeDropdown(select); // place dropdown based on available space
    }
  };

  function placeDropdown(select) {
    // remove placement classes to reset position
    Util.removeClass(select.dropdown, 'select__dropdown--right select__dropdown--up');
    var triggerBoundingRect = select.trigger.getBoundingClientRect();
    Util.toggleClass(select.dropdown, 'select__dropdown--right', (document.documentElement.clientWidth - 5 < triggerBoundingRect.left + select.dropdown.offsetWidth));
    // check if there's enough space up or down
    var moveUp = (window.innerHeight - triggerBoundingRect.bottom - 5) < triggerBoundingRect.top;
    Util.toggleClass(select.dropdown, 'select__dropdown--up', moveUp);
    // check if we need to set a max width
    var maxHeight = moveUp ? triggerBoundingRect.top - 20 : window.innerHeight - triggerBoundingRect.bottom - 20;
    // set max-height based on available space
    select.dropdown.setAttribute('style', 'max-height: '+maxHeight+'px; width: '+triggerBoundingRect.width+'px;');
  };

  function keyboardCustomSelect(select, direction, event) { // navigate custom dropdown with keyboard
    event.preventDefault();
    var index = Util.getIndexInArray(select.customOptions, document.activeElement);
    index = (direction == 'next') ? index + 1 : index - 1;
    if(index < 0) index = select.customOptions.length - 1;
    if(index >= select.customOptions.length) index = 0;
    Util.moveFocus(select.customOptions[index]);
  };

  function initSelection(select) { // option selection
    select.dropdown.addEventListener('click', function(event){
      var option = event.target.closest('.js-select__item');
      if(!option) return;
      selectOption(select, option);
    });
  };

  function selectOption(select, option) {
    if(option.hasAttribute('aria-selected') && option.getAttribute('aria-selected') == 'true') {
      // selecting the same option
      select.trigger.setAttribute('aria-expanded', 'false'); // hide dropdown
    } else {
      var selectedOption = select.dropdown.querySelector('[aria-selected="true"]');
      if(selectedOption) selectedOption.setAttribute('aria-selected', 'false');
      option.setAttribute('aria-selected', 'true');
      select.trigger.getElementsByClassName('js-select__label')[0].textContent = option.textContent;
      select.trigger.setAttribute('aria-expanded', 'false');
      // new option has been selected -> update native <select> element _ arai-label of trigger <button>
      updateNativeSelect(select, option.getAttribute('data-index'));
      updateTriggerAria(select);
    }
    // move focus back to trigger
    select.trigger.focus();
  };

  function updateNativeSelect(select, index) {
    select.select.selectedIndex = index;
    select.select.dispatchEvent(new CustomEvent('change', {bubbles: true})); // trigger change event
  };

  function updateTriggerAria(select) {
    select.trigger.setAttribute('aria-label', select.options[select.select.selectedIndex].innerHTML+', '+select.label.textContent);
  };

  function getSelectedOptionText(select) {// used to initialize the label of the custom select button
    var label = '';
    if('selectedIndex' in select.select) {
      label = select.options[select.select.selectedIndex].text;
    } else {
      label = select.select.querySelector('option[selected]').text;
    }
    return label;

  };

  function initButtonSelect(select) { // create the button element -> custom select trigger
    // check if we need to add custom classes to the button trigger
    var customClasses = select.element.getAttribute('data-trigger-class') ? ' '+select.element.getAttribute('data-trigger-class') : '';

    var label = select.options[select.select.selectedIndex].innerHTML+', '+select.label.textContent;

    var button = '<button type="button" class="js-select__button select__button'+customClasses+'" aria-label="'+label+'" aria-expanded="false" aria-controls="'+select.selectId+'-dropdown"><span aria-hidden="true" class="js-select__label select__label">'+select.selectedOption+'</span>';
    if(select.arrowIcon.length > 0 && select.arrowIcon[0].outerHTML) {
      var clone = select.arrowIcon[0].cloneNode(true);
      Util.removeClass(clone, 'select__icon');
      button = button +clone.outerHTML;
    }

    return button+'</button>';

  };

  function initListSelect(select) { // create custom select dropdown
    var list = '<div class="js-select__dropdown select__dropdown" aria-describedby="'+select.selectId+'-description" id="'+select.selectId+'-dropdown">';
    list = list + getSelectLabelSR(select);
    if(select.optGroups.length > 0) {
      for(var i = 0; i < select.optGroups.length; i++) {
        var optGroupList = select.optGroups[i].getElementsByTagName('option'),
          optGroupLabel = '<li><span class="select__item select__item--optgroup">'+select.optGroups[i].getAttribute('label')+'</span></li>';
        list = list + '<ul class="select__list" role="listbox">'+optGroupLabel+getOptionsList(select, optGroupList) + '</ul>';
      }
    } else {
      list = list + '<ul class="select__list" role="listbox">'+getOptionsList(select, select.options) + '</ul>';
    }
    return list;
  };

  function getSelectLabelSR(select) {
    if(select.label) {
      return '<p class="sr-only" id="'+select.selectId+'-description">'+select.label.textContent+'</p>'
    } else {
      return '';
    }
  };

  function resetCustomSelect(select) {
    // <select> element has been updated (using an external control) - update custom select
    var selectedOption = select.dropdown.querySelector('[aria-selected="true"]');
    if(selectedOption) selectedOption.setAttribute('aria-selected', 'false');
    var option = select.dropdown.querySelector('.js-select__item[data-index="'+select.select.selectedIndex+'"]');
    option.setAttribute('aria-selected', 'true');
    select.trigger.getElementsByClassName('js-select__label')[0].textContent = option.textContent;
    select.trigger.setAttribute('aria-expanded', 'false');
    updateTriggerAria(select);
  };

  function getOptionsList(select, options) {
    var list = '';
    for(var i = 0; i < options.length; i++) {
      var selected = options[i].hasAttribute('selected') ? ' aria-selected="true"' : ' aria-selected="false"',
        disabled = options[i].hasAttribute('disabled') ? ' disabled' : '';
      list = list + '<li><button type="button" class="reset js-select__item select__item select__item--option" role="option" data-value="'+options[i].value+'" '+selected+disabled+' data-index="'+select.optionIndex+'">'+options[i].text+'</button></li>';
      select.optionIndex = select.optionIndex + 1;
    };
    return list;
  };

  function getSelectedOption(select) {
    var option = select.dropdown.querySelector('[aria-selected="true"]');
    if(option) return option;
    else return select.dropdown.getElementsByClassName('js-select__item')[0];
  };

  function moveFocusToSelectTrigger(select) {
    if(!document.activeElement.closest('.js-select')) return
    select.trigger.focus();
  };

  function checkCustomSelectClick(select, target) { // close select when clicking outside it
    if( !select.element.contains(target) ) toggleCustomSelect(select, 'false');
  };

  //initialize the CustomSelect objects
  var customSelect = document.getElementsByClassName('js-select');
  if( customSelect.length > 0 ) {
    var selectArray = [];
    for( var i = 0; i < customSelect.length; i++) {
      (function(i){selectArray.push(new CustomSelect(customSelect[i]));})(i);
    }

    // listen for key events
    window.addEventListener('keyup', function(event){
      if( event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape' ) {
        // close custom select on 'Esc'
        selectArray.forEach(function(element){
          moveFocusToSelectTrigger(element); // if focus is within dropdown, move it to dropdown trigger
          toggleCustomSelect(element, 'false'); // close dropdown
        });
      }
    });
    // close custom select when clicking outside it
    window.addEventListener('click', function(event){
      selectArray.forEach(function(element){
        checkCustomSelectClick(element, event.target);
      });
    });
  }
};




// File#: _1_side-navigation
// Usage: codyhouse.co/license
const sideNav = function() {
  function initSideNav(nav) {
    nav.addEventListener('click', function(event){
      var btn = event.target.closest('.js-sidenav__sublist-control');
      if(!btn) return;
      var listItem = btn.parentElement,
        bool = Util.hasClass(listItem, 'sidenav__item--expanded');
      btn.setAttribute('aria-expanded', !bool);
      Util.toggleClass(listItem, 'sidenav__item--expanded', !bool);
    });
  };

  var sideNavs = document.getElementsByClassName('js-sidenav');
  if( sideNavs.length > 0 ) {
    for( var i = 0; i < sideNavs.length; i++) {
      (function(i){initSideNav(sideNavs[i]);})(i);
    }
  }
};


 // File#: _1_responsive-sidebar
// Usage: codyhouse.co/license
const responsiveSidebar = function() {

  var Sidebar = function(element) {
    this.element = element;
    this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.selectedTrigger = null;
    this.showClass = "sidebar--is-visible";
    this.staticClass = "sidebar--static";
    this.customStaticClass = "";
    this.readyClass = "sidebar--loaded";
    this.contentReadyClass = "sidebar-loaded:show";
    this.layout = false; // this will be static or mobile
    this.preventScrollEl = getPreventScrollEl(this);
    getCustomStaticClass(this); // custom classes for static version
    initSidebar(this);
  };

  function getPreventScrollEl(element) {
    var scrollEl = false;
    var querySelector = element.element.getAttribute('data-sidebar-prevent-scroll');
    if(querySelector) scrollEl = document.querySelector(querySelector);
    return scrollEl;
  };

  function getCustomStaticClass(element) {
    var customClasses = element.element.getAttribute('data-static-class');
    if(customClasses) element.customStaticClass = ' '+customClasses;
  };

  function initSidebar(sidebar) {
    initSidebarResize(sidebar); // handle changes in layout -> mobile to static and viceversa

    if ( sidebar.triggers ) { // open sidebar when clicking on trigger buttons - mobile layout only
      for(var i = 0; i < sidebar.triggers.length; i++) {
        sidebar.triggers[i].addEventListener('click', function(event) {
          event.preventDefault();
          toggleSidebar(sidebar, event.target);
        });
      }
    }

    // use the 'openSidebar' event to trigger the sidebar
    sidebar.element.addEventListener('openSidebar', function(event) {
      toggleSidebar(sidebar, event.detail);
    });
  };

  function toggleSidebar(sidebar, target) {
    if(Util.hasClass(sidebar.element, sidebar.showClass)) {
      sidebar.selectedTrigger = target;
      closeSidebar(sidebar);
      return;
    }
    sidebar.selectedTrigger = target;
    showSidebar(sidebar);
    initSidebarEvents(sidebar);
  };

  function showSidebar(sidebar) { // mobile layout only
    Util.addClass(sidebar.element, sidebar.showClass);
    getFocusableElements(sidebar);
    Util.moveFocus(sidebar.element);
    // change the overflow of the preventScrollEl
    if(sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = 'hidden';
  };

  function closeSidebar(sidebar) { // mobile layout only
    Util.removeClass(sidebar.element, sidebar.showClass);
    sidebar.firstFocusable = null;
    sidebar.lastFocusable = null;
    if(sidebar.selectedTrigger) sidebar.selectedTrigger.focus();
    sidebar.element.removeAttribute('tabindex');
    //remove listeners
    cancelSidebarEvents(sidebar);
    // change the overflow of the preventScrollEl
    if(sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = '';
  };

  function initSidebarEvents(sidebar) { // mobile layout only
    //add event listeners
    sidebar.element.addEventListener('keydown', handleEvent.bind(sidebar));
    sidebar.element.addEventListener('click', handleEvent.bind(sidebar));
  };

  function cancelSidebarEvents(sidebar) { // mobile layout only
    //remove event listeners
    sidebar.element.removeEventListener('keydown', handleEvent.bind(sidebar));
    sidebar.element.removeEventListener('click', handleEvent.bind(sidebar));
  };

  function handleEvent(event) { // mobile layout only
    switch(event.type) {
      case 'click': {
        initClick(this, event);
      }
      case 'keydown': {
        initKeyDown(this, event);
      }
    }
  };

  function initKeyDown(sidebar, event) { // mobile layout only
    if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
      //close sidebar window on esc
      closeSidebar(sidebar);
    } else if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
      //trap focus inside sidebar
      trapFocus(sidebar, event);
    }
  };

  function initClick(sidebar, event) { // mobile layout only
    //close sidebar when clicking on close button or sidebar bg layer
    if( !event.target.closest('.js-sidebar__close-btn') && !Util.hasClass(event.target, 'js-sidebar') ) return;
    event.preventDefault();
    closeSidebar(sidebar);
  };

  function trapFocus(sidebar, event) { // mobile layout only
    if( sidebar.firstFocusable == document.activeElement && event.shiftKey) {
      //on Shift+Tab -> focus last focusable element when focus moves out of sidebar
      event.preventDefault();
      sidebar.lastFocusable.focus();
    }
    if( sidebar.lastFocusable == document.activeElement && !event.shiftKey) {
      //on Tab -> focus first focusable element when focus moves out of sidebar
      event.preventDefault();
      sidebar.firstFocusable.focus();
    }
  };

  function initSidebarResize(sidebar) {
    // custom event emitted when window is resized - detect only if the sidebar--static@{breakpoint} class was added
    var beforeContent = getComputedStyle(sidebar.element, ':before').getPropertyValue('content');
    if(beforeContent && beforeContent !='' && beforeContent !='none') {
      checkSidebarLayout(sidebar);

      sidebar.element.addEventListener('update-sidebar', function(event){
        checkSidebarLayout(sidebar);
      });
    }
    // check if there a main element to show
    var mainContent = document.getElementsByClassName(sidebar.contentReadyClass);
    if(mainContent.length > 0) Util.removeClass(mainContent[0], sidebar.contentReadyClass);
    Util.addClass(sidebar.element, sidebar.readyClass);
  };

  function checkSidebarLayout(sidebar) {
    var layout = getComputedStyle(sidebar.element, ':before').getPropertyValue('content').replace(/\'|"/g, '');
    if(layout == sidebar.layout) return;
    sidebar.layout = layout;
    if(layout != 'static') Util.addClass(sidebar.element, 'is-hidden');
    Util.toggleClass(sidebar.element, sidebar.staticClass + sidebar.customStaticClass, layout == 'static');
    if(layout != 'static') setTimeout(function(){Util.removeClass(sidebar.element, 'is-hidden')});
    // reset element role
    (layout == 'static') ? sidebar.element.removeAttribute('role', 'alertdialog') :  sidebar.element.setAttribute('role', 'alertdialog');
    // reset mobile behaviour
    if(layout == 'static' && Util.hasClass(sidebar.element, sidebar.showClass)) closeSidebar(sidebar);
  };

  function getFocusableElements(sidebar) {
    //get all focusable elements inside the drawer
    var allFocusable = sidebar.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
    getFirstVisible(sidebar, allFocusable);
    getLastVisible(sidebar, allFocusable);
  };

  function getFirstVisible(sidebar, elements) {
    //get first visible focusable element inside the sidebar
    for(var i = 0; i < elements.length; i++) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        sidebar.firstFocusable = elements[i];
        return true;
      }
    }
  };

  function getLastVisible(sidebar, elements) {
    //get last visible focusable element inside the sidebar
    for(var i = elements.length - 1; i >= 0; i--) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        sidebar.lastFocusable = elements[i];
        return true;
      }
    }
  };

  window.Sidebar = Sidebar;

  //initialize the Sidebar objects
  var sidebar = document.getElementsByClassName('js-sidebar');
  if( sidebar.length > 0 ) {
    for( var i = 0; i < sidebar.length; i++) {
      (function(i){new Sidebar(sidebar[i]);})(i);
    }
    // switch from mobile to static layout
    var customEvent = new CustomEvent('update-sidebar');
    window.addEventListener('resize', function(event){
      (!window.requestAnimationFrame) ? setTimeout(function(){resetLayout();}, 250) : window.requestAnimationFrame(resetLayout);
    });

    (window.requestAnimationFrame) // init sidebar layout
      ? window.requestAnimationFrame(resetLayout)
      : resetLayout();

    function resetLayout() {
      for( var i = 0; i < sidebar.length; i++) {
        (function(i){sidebar[i].dispatchEvent(customEvent)})(i);
      };
    };
  }
};

// File#: _1_expandable-side-navigation
// Usage: codyhouse.co/license
const expandableSideNav = function() {
  var Exsidenav = function(element) {
		this.element = element;
    this.controls = this.element.getElementsByClassName('js-exsidenav__control');
    this.index = 0;
		initExsidenav(this);
	};

  function initExsidenav(element) {
    // set aria attributes
    initAria(element);
    // detect click on control buttons
    element.element.addEventListener('click', function(event){
      var control = event.target.closest('.js-exsidenav__control');
      if(control) toggleNav(control);
    });
  };

  function initAria(element) {
    // set aria attributes -> aria-controls and aria-expanded
    var randomNum = getRandomInt(0, 1000);
    for(var i = 0; i < element.controls.length; i++) {
      var newId = 'exsidenav-'+randomNum+'-'+element.index,
        id = element.controls[i].nextElementSibling.getAttribute('id');
      if(!id) {
        id = newId;
        element.controls[i].nextElementSibling.setAttribute('id', newId);
      }
      element.index = element.index + 1;
      element.controls[i].setAttribute('aria-controls', id);
      if(!element.controls[i].getAttribute('aria-expanded')) element.controls[i].setAttribute('aria-expanded', 'false');
    }
  };

  function toggleNav(control) {
    // open/close sub list
    var bool = (control.getAttribute('aria-expanded') === 'true'),
      ariaValue = bool ? 'false' : 'true';
    control.setAttribute('aria-expanded', ariaValue);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.Exsidenav = Exsidenav;

	//initialize the Exsidenav objects
	var exsidenav = document.getElementsByClassName('js-exsidenav');
	if( exsidenav.length > 0 ) {
		for( var i = 0; i < exsidenav.length; i++) {
			(function(i){new Exsidenav(exsidenav[i]);})(i);
		}
	}
};

// File#: _1_diagonal-movement
// Usage: codyhouse.co/license
/*
  Modified version of the jQuery-menu-aim plugin
  https://github.com/kamens/jQuery-menu-aim
  - Replaced jQuery with Vanilla JS
  - Minor changes
*/
const diagonalMovementAndSideNav4 = function() {
  var menuAim = function(opts) {
    init(opts);
  };

  window.menuAim = menuAim;

  function init(opts) {
    var activeRow = null,
      mouseLocs = [],
      lastDelayLoc = null,
      timeoutId = null,
      options = Util.extend({
        menu: '',
        rows: false, //if false, get direct children - otherwise pass nodes list
        submenuSelector: "*",
        submenuDirection: "right",
        tolerance: 75,  // bigger = more forgivey when entering submenu
        enter: function(){},
        exit: function(){},
        activate: function(){},
        deactivate: function(){},
        exitMenu: function(){}
      }, opts),
      menu = options.menu;

    var MOUSE_LOCS_TRACKED = 3,  // number of past mouse locations to track
      DELAY = 300;  // ms delay when user appears to be entering submenu

    /**
     * Keep track of the last few locations of the mouse.
     */
    var mouseMoveFallback = function(event) {
      (!window.requestAnimationFrame) ? mousemoveDocument(event) : window.requestAnimationFrame(function(){mousemoveDocument(event);});
    };

    var mousemoveDocument = function(e) {
      mouseLocs.push({x: e.pageX, y: e.pageY});

      if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
        mouseLocs.shift();
      }
    };

    /**
     * Cancel possible row activations when leaving the menu entirely
     */
    var mouseleaveMenu = function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // If exitMenu is supplied and returns true, deactivate the
      // currently active row on menu exit.
      if (options.exitMenu(this)) {
        if (activeRow) {
          options.deactivate(activeRow);
        }

        activeRow = null;
      }
    };

    /**
     * Trigger a possible row activation whenever entering a new row.
     */
    var mouseenterRow = function() {
      if (timeoutId) {
        // Cancel any previous activation delays
        clearTimeout(timeoutId);
      }

      options.enter(this);
      possiblyActivate(this);
    },
    mouseleaveRow = function() {
      options.exit(this);
    };

    /*
     * Immediately activate a row if the user clicks on it.
     */
    var clickRow = function() {
      activate(this);
    };

    /**
     * Activate a menu row.
     */
    var activate = function(row) {
      if (row == activeRow) {
        return;
      }

      if (activeRow) {
        options.deactivate(activeRow);
      }

      options.activate(row);
      activeRow = row;
    };

    /**
     * Possibly activate a menu row. If mouse movement indicates that we
     * shouldn't activate yet because user may be trying to enter
     * a submenu's content, then delay and check again later.
     */
    var possiblyActivate = function(row) {
      var delay = activationDelay();

      if (delay) {
        timeoutId = setTimeout(function() {
          possiblyActivate(row);
        }, delay);
      } else {
        activate(row);
      }
    };

    /**
     * Return the amount of time that should be used as a delay before the
     * currently hovered row is activated.
     *
     * Returns 0 if the activation should happen immediately. Otherwise,
     * returns the number of milliseconds that should be delayed before
     * checking again to see if the row should be activated.
     */
    var activationDelay = function() {
      if (!activeRow || !Util.is(activeRow, options.submenuSelector)) {
        // If there is no other submenu row already active, then
        // go ahead and activate immediately.
        return 0;
      }

      function getOffset(element) {
        var rect = element.getBoundingClientRect();
        return { top: rect.top + window.pageYOffset, left: rect.left + window.pageXOffset };
      };

      var offset = getOffset(menu),
          upperLeft = {
              x: offset.left,
              y: offset.top - options.tolerance
          },
          upperRight = {
              x: offset.left + menu.offsetWidth,
              y: upperLeft.y
          },
          lowerLeft = {
              x: offset.left,
              y: offset.top + menu.offsetHeight + options.tolerance
          },
          lowerRight = {
              x: offset.left + menu.offsetWidth,
              y: lowerLeft.y
          },
          loc = mouseLocs[mouseLocs.length - 1],
          prevLoc = mouseLocs[0];

      if (!loc) {
        return 0;
      }

      if (!prevLoc) {
        prevLoc = loc;
      }

      if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
        // If the previous mouse location was outside of the entire
        // menu's bounds, immediately activate.
        return 0;
      }

      if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
        // If the mouse hasn't moved since the last time we checked
        // for activation status, immediately activate.
        return 0;
      }

      // Detect if the user is moving towards the currently activated
      // submenu.
      //
      // If the mouse is heading relatively clearly towards
      // the submenu's content, we should wait and give the user more
      // time before activating a new row. If the mouse is heading
      // elsewhere, we can immediately activate a new row.
      //
      // We detect this by calculating the slope formed between the
      // current mouse location and the upper/lower right points of
      // the menu. We do the same for the previous mouse location.
      // If the current mouse location's slopes are
      // increasing/decreasing appropriately compared to the
      // previous's, we know the user is moving toward the submenu.
      //
      // Note that since the y-axis increases as the cursor moves
      // down the screen, we are looking for the slope between the
      // cursor and the upper right corner to decrease over time, not
      // increase (somewhat counterintuitively).
      function slope(a, b) {
        return (b.y - a.y) / (b.x - a.x);
      };

      var decreasingCorner = upperRight,
        increasingCorner = lowerRight;

      // Our expectations for decreasing or increasing slope values
      // depends on which direction the submenu opens relative to the
      // main menu. By default, if the menu opens on the right, we
      // expect the slope between the cursor and the upper right
      // corner to decrease over time, as explained above. If the
      // submenu opens in a different direction, we change our slope
      // expectations.
      if (options.submenuDirection == "left") {
        decreasingCorner = lowerLeft;
        increasingCorner = upperLeft;
      } else if (options.submenuDirection == "below") {
        decreasingCorner = lowerRight;
        increasingCorner = lowerLeft;
      } else if (options.submenuDirection == "above") {
        decreasingCorner = upperLeft;
        increasingCorner = upperRight;
      }

      var decreasingSlope = slope(loc, decreasingCorner),
        increasingSlope = slope(loc, increasingCorner),
        prevDecreasingSlope = slope(prevLoc, decreasingCorner),
        prevIncreasingSlope = slope(prevLoc, increasingCorner);

      if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
        // Mouse is moving from previous location towards the
        // currently activated submenu. Delay before activating a
        // new menu row, because user may be moving into submenu.
        lastDelayLoc = loc;
        return DELAY;
      }

      lastDelayLoc = null;
      return 0;
    };

    var reset = function(triggerDeactivate) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (activeRow && triggerDeactivate) {
        options.deactivate(activeRow);
      }

      activeRow = null;
    };

    var destroyInstance = function() {
      menu.removeEventListener('mouseleave', mouseleaveMenu);
      document.removeEventListener('mousemove', mouseMoveFallback);
      if(rows.length > 0) {
        for(var i = 0; i < rows.length; i++) {
          rows[i].removeEventListener('mouseenter', mouseenterRow);
          rows[i].removeEventListener('mouseleave', mouseleaveRow);
          rows[i].removeEventListener('click', clickRow);
        }
      }

    };

    /**
     * Hook up initial menu events
     */
    menu.addEventListener('mouseleave', mouseleaveMenu);
    var rows = (options.rows) ? options.rows : menu.children;
    if(rows.length > 0) {
      for(var i = 0; i < rows.length; i++) {(function(i){
        rows[i].addEventListener('mouseenter', mouseenterRow);
        rows[i].addEventListener('mouseleave', mouseleaveRow);
        rows[i].addEventListener('click', clickRow);
      })(i);}
    }

    document.addEventListener('mousemove', mouseMoveFallback);

    /* Reset/destroy menu */
    menu.addEventListener('reset', function(event){
      reset(event.detail);
    });
    menu.addEventListener('destroy', destroyInstance);
  };

  // File#: _2_side-navigation-v4
// Usage: codyhouse.co/license
(function() {
  function initSideNav(nav) {
    // create btns - visible on mobile only
    createBtns(nav);
    // toggle sublists on mobile when clicking on buttons
    toggleSubLists(nav);
    // init diagonal movement
    initDiagonalMove(nav);
  };

  function createBtns(nav) {
    // on mobile -> create a <button> element for each link with a submenu
    var expandableLinks = nav.getElementsByClassName('js-sidenav-v4__link');
    for(var i = 0; i < expandableLinks.length; i++) {
      createSingleBtn(expandableLinks[i]);
    }
  };

  function createSingleBtn(link) {
    if(!hasSubList(link)) return;
    // create btn and insert it into the DOM
    var btnClasses = link.getAttribute('class').replace('js-sidenav-v4__link', 'js-sidenav-v4__btn');
    btnClasses = btnClasses +' sidenav-v4__link--btn';
    var btnHtml = '<button class="reset '+btnClasses+'">'+link.innerHTML+'</button>';
    link.insertAdjacentHTML('afterend', btnHtml);
    // add class to link element
    Util.addClass(link, 'sidenav-v4__link--href');
    // check if we need to add the collpsed class to the <li> element
    var listItem = link.parentElement;
    if(!Util.hasClass(listItem, 'sidenav-v4__item--current')) Util.addClass(listItem, 'sidenav-v4__item--collapsed');
  };

  function hasSubList(link) {
    // check if link has submenu
    var sublist = link.nextElementSibling;
    if(!sublist) return false;
    return Util.hasClass(sublist, 'sidenav-v4__sub-list');
  };

  function toggleSubLists(nav) {
    // open/close sublist on mobile
    nav.addEventListener('click', function(event){
      var btn = event.target.closest('.js-sidenav-v4__btn');
      if(!btn) return;
      Util.toggleClass(btn.parentElement, 'sidenav-v4__item--collapsed', !Util.hasClass(btn.parentElement, 'sidenav-v4__item--collapsed'));
    });
  };

  function initDiagonalMove(nav) {
    // improve dropdown navigation
    new menuAim({
      menu: nav.querySelector('ul'),
      activate: function(row) {
        Util.addClass(row, 'sidenav-v4__item--hover');
      },
      deactivate: function(row) {
        Util.removeClass(row, 'sidenav-v4__item--hover');
      },
      exitMenu: function() {
        return true;
      },
    });
  };

  var sideNavs = document.getElementsByClassName('js-sidenav-v4');
  if( sideNavs.length > 0 ) {
    for( var i = 0; i < sideNavs.length; i++) {
      (function(i){initSideNav(sideNavs[i]);})(i);
    }
  }
}());
};

