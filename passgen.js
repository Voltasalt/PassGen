$(function() {
    function calc() {
        var site = $("#siteName").val();
        var pass = $("#masterPass").val();

        var siteHash = site, passHash = pass;

        for (var i = 0; i < 2000; i++) {
            siteHash = sjcl.hash.sha256.hash(siteHash);
            passHash = sjcl.hash.sha256.hash(passHash);
        }

        var out = JSON.parse(sjcl.encrypt(passHash, siteHash));

        $("#output").val(out.ct);
    }

    $("#masterPass").keyup(function() {
        calc();
    });

    $("#siteName").keyup(function() {
        calc();
    });

    $("#show").click(function() {
        if ($("#show").is(":checked")) {
            $("#output").attr("type", "text");
        } else {
            $("#output").attr("type", "password");
        }
    });

    $("#show").removeAttr("checked");
});