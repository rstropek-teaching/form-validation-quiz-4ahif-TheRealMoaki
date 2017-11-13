$(document).ready(function () {
    let firstNameId: String         = "#firstName";
    let firstNameMan: String        = "#firstNameMandatory";
    let lastNameId: String          = "#lastName";
    let lastNameMan: String         = "#lastNameMandatory";
    let email: String               = "#email";
    let emailMan: String            = "#emailMandatory";
    let mediaChannelSelect: String  = "#mediaChannelSelect";
    let otherMediaChannel: String   = "#otherMediaChannel";
    let newsletter: String          = "#newsletter";
    let submitCondition: number     = -1;
    let emailNewslPreCondition: Boolean = false;
    setupHtmlForm();

    function setupHtmlForm() {
        $(emailMan).hide();
        $(otherMediaChannel).hide();
        $(':input[type="submit"]').prop('disabled', true);        
    }

    $(firstNameId).change(function () {
        let condition: Boolean = $(firstNameId).val() === "";
        alertCondition(firstNameMan, condition);
        condition ? submitCondition-- : submitCondition++;
    });

    $(lastNameId).change(function () {
        let condition: Boolean = $(lastNameId).val() === "";
        alertCondition(lastNameMan, condition);
        condition ? submitCondition-- : submitCondition++;
    });

    $(email + ',' + newsletter).change(function () {
        let condition1: Boolean = $(email).val() === "";
        let condition2: Boolean = $(newsletter).is(':checked');
        alertCondition(emailMan, condition1 && condition2);
        if(condition1 && condition2){
            submitCondition--;
        }else if(emailNewslPreCondition && (!condition1 || !condition2)){
            submitCondition++;
        }        
        emailNewslPreCondition = condition1 && condition2;        
    });

    $(mediaChannelSelect).change(function () {
        let condition: Boolean = $(mediaChannelSelect).val() === "Other";
        alertCondition(otherMediaChannel, condition);
    });

    $(document).change(function() {
        let correctFilled: Boolean = submitCondition ? true : false;            
        $(':input[type="submit"]').prop('disabled', !correctFilled); 
    });

    function alertCondition(obj: String, condition: Boolean) {
        condition ? $(obj).show() : $(obj).hide();
    }
});