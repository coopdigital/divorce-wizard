Vue.component('ErrorMessage', {
    name: 'error-message',
    props: {
        field: String,
        showErrors: Boolean
    },
    template: '<span v-if="showErrors && field" class="coop-c-form-error__text">{{field}}</span>'
});

var app = new Vue({
    el: '#divorceWizardApp',
    data: {
        currentStep: 1,
        step1: {
            formSubmitted: false,
            isEligible: null,
        },
        step2: {
            formSubmitted: false,
            isEligible: null,
        },
        step3: {
            formSubmitted: false,
            isEligible: null,
        },
        step4: {
            formSubmitted: false,
            isEligible: null,
        },
        step5: {
            formSubmitted: false,
            isEligible: null,
        },
        step6: {
            formSubmitted: false,
            isEligible: null,
        },
        step7: {
            formSubmitted: false,
            isEligible: null,
        },

        marriedHowLong: null,
        postNuptialAgreement: null,
        agreedDivorce: null,

        children: null,
        childrenDependants: null,
        childrenLive: null,

        work: null,
        workDoNot: [],
        workUnable: null,
        workRely: null,
        workPartner: null,
        workPartnerDoNot: [],
        workPartnerUnable: null,
        workPartnerRely: null,

        home: null,
        homeJoint: null,
        homePartner: null,
        homeContinueLive: null,

        debtJoint: null,
        debtSole: null,
        debtPartner: null,

        savingsJoint: null,
        savingsSole: null,
        savingsPartner: null,

        will: null,

        errors: {},

        showHousingResult1: null,
        showHousingResult2: null,
        showHousingResult3: null,
        showHousingResult4: null,
        showHousingResult5: null,
        showHousingResult6: null,

        showIncomeResult1: null,
        showIncomeResult2: null,
        showIncomeResult3: null,
        showIncomeResult4: null,

        showChildrenResult1: null,
        showChildrenResult2: null,
        showChildrenResults: null,

        showDebtResult1: null,
        showDebtResult2: null,
        showDebtResult3: null,
        showDebtResults: null,

        showSavingsResult1: null,
        showSavingsResult2: null,
        showSavingsResult3: null,
        showSavingsResults: null

    },
    methods: {
        goToStep: function (step) {
            if (this.currentStep === 8) {
                this.showResult1 = null;
                this.showResult2 = null;
                this.showResult3 = null;
                this.showResult3Item1 = null;
                this.showResult3Item2 = null;
                this.showResult3Item3 = null;
                this.showResult3Item4 = null;
            }
            this.currentStep = step;
        },
        ready: function () {
            console.log('ready');
        },
        goToStep2: function () {
            this.step1.formSubmitted = true;
            this.checkForm();

            if (Object.keys(this.errors).length) {
                return;
            }

            this.step1.isEligible = this.canGoToStep2();

            if (!this.step1.isEligible) {
                return;
            }

            this.currentStep = 2;
            this.step1.formSubmitted = false;
        },
        goToStep3: function () {
            this.step2.formSubmitted = true;
            this.checkForm();            

            if (Object.keys(this.errors).length) {
                return;
            }

            this.step2.isEligible = this.canGoToStep3();

            if (!this.step2.isEligible) {
                return;
            }

            this.currentStep = 3;
            this.step2.formSubmitted = false;
        },
        goToStep4: function () {
            this.step3.formSubmitted = true;
            this.setPartnerWorkResponses();

            this.checkForm();

            // customer validation for Step3 Checkboxes
            if (this.step3.formSubmitted) {
                if (this.work == 'no' && this.workDoNot.length == 0) {
                    this.errors.workDoNot = "Please check one of the boxes above to proceed";
                } else {
                    if (this.workDoNot.length > 1 && this.workDoNot.indexOf('other') >= 0) {
                        this.errors.workDoNot = "Please select either 'None of these reasons' or one of the other options";
                    };
                };
                if (this.workPartner == 'no' && this.workPartnerDoNot.length == 0) {
                    this.errors.workPartnerDoNot = "Please check one of the boxes above to proceed";
                } else {
                    if (this.workPartnerDoNot.length > 1 && this.workPartnerDoNot.indexOf('other') >= 0) {
                        this.errors.workPartnerDoNot = "Please select either 'None of these reasons' or one of the other options";
                    };
                };
            }

            if (Object.keys(this.errors).length) {
                return;
            }

            this.step3.isEligible = this.canGoToStep4();

            if (!this.step3.isEligible) {
                return;
            }

            this.currentStep = 4;
            this.step3.formSubmitted = false;
        },
        goToStep5: function () {
            this.step4.formSubmitted = true;
            this.checkForm();
            console.log('Go to Step 5 running')

            if (Object.keys(this.errors).length) {
                return;
            }
            console.log('Go to Step 5 running after validation')

            this.step4.isEligible = this.canGoToStep5();

            if (!this.step4.isEligible) {
                return;
            }
            console.log('Go to Step 5 running after isEligible')
            this.currentStep = 5;
            this.step4.formSubmitted = false;
        },
        goToStep6: function () {
            this.step5.formSubmitted = true;
            this.checkForm();

            if (Object.keys(this.errors).length) {
                return;
            }

            this.step5.isEligible = this.canGoToStep6();

            if (!this.step5.isEligible) {
                return;
            }

            this.currentStep = 6;
            this.step5.formSubmitted = false;
        },
        goToStep7: function () {
            this.step6.formSubmitted = true;
            this.checkForm();

            if (Object.keys(this.errors).length) {
                return;
            }

            this.step6.isEligible = this.canGoToStep7();

            if (!this.step6.isEligible) {
                return;
            }

            this.currentStep = 7;
            this.step6.formSubmitted = false;
        },
        goToStep8: function () {
            this.step7.formSubmitted = true;
            this.checkForm();

            if (Object.keys(this.errors).length) {
                return;
            }

            this.step7.isEligible = this.canGoToStep8();

            if (!this.step7.isEligible) {
                return;
            }

            this.currentStep = 8;
            this.step7.formSubmitted = false;
        },

        canGoToStep2: function () {
            if (this.marriedHowLong !== 1 && this.postNuptialAgreement === 'no' && this.agreedDivorce === 'yes') {
                console.log('can proceed to next step')
                this.canGoNext = true;

            } else {
                console.log('cannot proceed to next step')
                this.canGoNext = false;
                //this.errors["test"] = "Invalid test custom error";
            }
            return this.canGoNext;
        },
        canGoToStep3: function () {
            // No logic required for this step yet
            this.canGoNext = true;
            return this.canGoNext;
        },
        canGoToStep4: function () {
            // No logic required for this step yet
            this.canGoNext = true;
            return this.canGoNext;
        },
        canGoToStep5: function () {
            // No logic required for this step yet
            this.canGoNext = true;
            return this.canGoNext;
        },
        canGoToStep6: function () {
            // No logic required for this step yet
            this.canGoNext = true;
            return this.canGoNext;
        },
        canGoToStep7: function () {
            // No logic required for this step yet
            this.canGoNext = true;
            return this.canGoNext;
        },
        canGoToStep8: function () {
            // No logic required for this step yet
            this.result();
            this.canGoNext = true;
            return this.canGoNext;
        },

        result: function () {
            this.showHousingResult1 = this.homeJoint === 'yes' && this.homeContinueLive == 3 && this.childrenDependants !== 'yes' && this.work === 'yes' && this.workPartner === 'yes' && this.workRely !== 'yes';
            this.showHousingResult2 = this.homeJoint === 'yes' && this.homeContinueLive == 1 && this.childrenDependants !== 'yes' && this.work === 'yes' && this.workPartner === 'yes' && this.workRely !== 'yes';
            this.showHousingResult3 = this.homeJoint === 'yes' && this.homeContinueLive == 2 && this.childrenDependants !== 'yes' && this.work === 'yes' && this.workPartner === 'yes' && this.workRely !== 'yes';
            this.showHousingResult4 = this.homeJoint === 'yes' && this.homeContinueLive == 4 && this.childrenDependants !== 'yes' && this.work === 'yes' && this.workPartner === 'yes';
            this.showHousingResult5 = this.work !== 'yes' && this.workRely === 'yes' && this.childrenLive == 1;

            this.setUnableToWork();
            this.showIncomeResult1 = this.work !== 'yes' && this.workUnable === 'yes' && this.workRely === 'yes';
            this.showIncomeResult2 = this.work !== 'yes' && this.workUnable !== 'yes' && this.workRely === 'yes';
            this.showIncomeResult3 = this.work === 'yes' && this.workPartnerUnable === 'yes' && this.workPartnerRely === 'yes' && (this.children === 'no' || this.childrenLive == 1);
            this.showIncomeResult4 = this.work === 'yes' && this.workPartnerUnable !== 'yes' && this.workPartnerRely === 'yes' && (this.children === 'no' || this.childrenLive == 1);
            this.showIncomeResult5 = this.work === 'yes' && this.workPartnerRely === 'yes' && this.children === 'yes' && this.childrenLive != 1;

            this.showChildrenResult1 = this.childrenDependants === 'yes' && this.childrenLive == 1;
            this.showChildrenResult2 = this.childrenDependants === 'yes' && this.childrenLive == 2;
            this.showChildrenResult3 = this.childrenDependants === 'yes' && (this.childrenLive == 3 || this.childrenLive == 4);
            this.showChildrenResults = this.showChildrenResult1 || this.showChildrenResult2 || this.showChildrenResult3;

            this.showDebtResult1 = this.debtJoint == 1;
            this.showDebtResult2 = this.debtSole === 'yes';
            this.showDebtResult3 = this.debtPartner == 1;
            this.showDebtResults = this.showDebtResult1 || this.showDebtResult2 || this.showDebtResult3;

            var savingsScenario1 = this.savingsJoint === 'yes' && this.workPartnerRely !== 'yes' && this.workRely !== 'yes' && this.homeJoint === 'yes' && this.childrenDependants !== 'yes';
            this.showSavingsResult1 = savingsScenario1 && this.savingsSole !== 'yes' && this.savingsPartner != 1;
            this.showSavingsResult2 = savingsScenario1 && this.savingsSole === 'yes' && this.savingsPartner != 1;
            this.showSavingsResult3 = savingsScenario1 && this.savingsSole !== 'yes' && this.savingsPartner == 1;
            this.showSavingsResult4 = savingsScenario1 && this.savingsSole === 'yes' && this.savingsPartner == 1;
            this.showSavingsResult5 = (this.workPartner !== 'yes' && this.workPartnerRely === 'yes') || (this.workPartner === 'yes' && this.childrenLive == 2);
            this.showSavingsResult6 = (this.work !== 'yes' && this.workRely === 'yes') || (this.work === 'yes' && this.childrenLive == 1);
            this.showSavingsResults = this.savingsJoint === 'yes' || this.savingsSole === 'yes' || this.savingsPartner == 1;
        },
        setPartnerWorkResponses: function () {
            if (this.workRely === 'yes') {
                this.workPartner = 'yes';
                this.workPartnerRely = 'no';
            }
        },
        setCheckboxSelection: function (arrayField, checkboxValue) {
            var array = this[arrayField];
            // only permits 'other' option to be set on its own
            if (array.length > 0) {
                var index = array.indexOf('other');
                if (index >= 0) {
                    if (checkboxValue == 'other') {
                        array.splice(0, [array.length], 'other');
                    } else {
                        array.splice(index, 1)
                    }
                }
            }
        },
        setUnableToWork: function () {
            this.workUnable = null;
            this.workPartnerUnable = null;
            if (this.work == 'no' && this.workDoNot.length > 0) {
                this.workUnable = this.workDoNot.indexOf('other') >= 0 ? 'no' : 'yes';
            }
            if (this.workPartner == 'no' && this.workPartnerDoNot.length > 0) {
                this.workPartnerUnable = this.workPartnerDoNot.indexOf('other') >= 0 ? 'no' : 'yes';
            }
        },
        setHousingQuestions: function () {
            if (this.home === 'yes') {
                this.homePartner = null;
            } else {
                this.homeJoint = null;
                this.homeContinueLive = null;
            }
        },
        checkForm: function () {
            console.log("Checking Form");

            this.errors = {};
            var inputs = document.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                if (!inputs[i].validity.valid) {
                    this.errors[inputs[i].name] = inputs[i].validationMessage;
                }
                if (inputs[i].validity.valid && inputs[i].type === 'text') {
                    // validation for date inputs that appear as text input in IE
                    for (var j = inputs[i].attributes.length - 1; j >= 0; j--) {
                        if (inputs[i].attributes[j].name === 'type' && inputs[i].attributes[j].value === 'date') {
                            var data = inputs[i].value.split("/");
                            if (!data[2] || data[2].length !== 4 || isNaN(Date.parse(data[2] + "-" + data[1] + "-" + data[0]))) {
                                this.errors[inputs[i].name] = "Invalid format. Please enter a date in the format dd/mm/yyyy";
                            }
                        }
                    }
                }
            }
        },
        scrollToError: function () {
            // Scroll to first error
            if (Object.keys(this.errors).length > 0) {

                var formElem = document.getElementById('divorceCalcForm');
                var items = formElem.getElementsByClassName('coop-c-form-error__text');
                if (items.length > 0) {
                    window.scrollTo({
                        top: items[0].offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
                return;
            };
        }
    },
    updated: function () {
        var v = this;
        var inputs = document.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('listener') !== 'true') {
                inputs[i].addEventListener('change', v.checkForm);
                inputs[i].setAttribute('listener', 'true');
            }
        }

        // Could use custom events to trigger this instead but it needs to be componentised first.
        if (this.scrollToValidation) {
            this.scrollToError();
            this.scrollToValidation = false;
        }
    },
    mounted: function () {
        var v = this;
        var inputs = document.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('listener') !== 'true') {
                inputs[i].addEventListener('change', v.checkForm);
                inputs[i].setAttribute('listener', 'true');
            }
        }
    }
});

$(document).ready(function () {
    console.log('Ready')
});