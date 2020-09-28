$(document).ready(function () {
  (function ($) {
    "use strict";

    jQuery.validator.addMethod(
      "answercheck",
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      "type the correct answer -_-"
    );

    // validate contactForm form
    $(function () {
      $("#contactForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          phone: {
            required: true,
          },
          subject: {
            required: true,
          },
          number: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
          },
        },
        messages: {
          name: {
            required: "Lütfen isim soyisim girin.",
            minlength: "İsim soyisim 2 harften kısa olamaz.",
          },
          phone: {
            required: "Lütfen telefon numaranızı girin.",
          },
          subject: {
            required: "Lütfen konuyu girin.",
          },
          number: {
            required: "come on, you have a number, don't you?",
            minlength: "your Number must consist of at least 5 characters",
          },
          email: {
            required: "Lütfen e-postanızı girin.",
          },
          message: {
            required: "Lütfen mesajınızı girin.",
          },
        },
        submitHandler: function (form) {
          $(form).ajaxSubmit({
            type: "POST",
            data: $(form).serialize(),
            url:
              "https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/u/5/d/e/1FAIpQLScDChVKeB5OJUglzQrpPgmpQCyYXbOkm6cTdmvRdrA38a-TlQ/formResponse",
            success: function () {
              console.log("buraya düştü mü");
              $("#contactForm :input").attr("disabled", "disabled");
              $("#contactForm").fadeTo("slow", 1, function () {
                $(this).find(":input").attr("disabled", "disabled");
                $(this).find("label").css("cursor", "default");
                $("#success").fadeIn();
                $(".modal").modal("hide");
                $("#success").modal("show");
              });
            },
            error: function () {
              $("#contactForm").fadeTo("slow", 1, function () {
                $("#error").fadeIn();
                $(".modal").modal("hide");
                $("#error").modal("show");
              });
            },
          });
        },
      });
    });
  })(jQuery);
});
