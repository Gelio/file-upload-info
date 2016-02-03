$(document).ready(function() {
    var submitButton = $('.upload-file'),
        output = $('.file-info'),
        uploadForm = $('.upload-form')[0];

    submitButton.click(function() {
        $(this).prop('disabled', true);

        var formData = new FormData($('form')[0]);
        $.ajax({
            url: '/upload',
            type: 'POST',
            success: uploadCompleted,
            error: uploadError,
            data: formData,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false
        });

        uploadForm.reset();

        console.log('Sending file');
        return false;
    });


    function uploadCompleted(responseData) {
        var jsonResponse;

        enableButton();

        try {
            jsonResponse = JSON.parse(responseData);
        } catch (e) {
            console.error('Cannot parse response data properly');
            return;
        }

        console.log(jsonResponse);
        if(jsonResponse.error)
            output.html('An error occured.');
        else
            output.html('Filename: ' + jsonResponse.name + '<br>Mime-type: ' + jsonResponse.mimetype + '<br>Size: ' + jsonResponse.size);
    }

    function uploadError(xhr, textStatus, errorThrown) {
        console.error('There was an error while sending data.', textStatus, errorThrown);
        enableButton();
    }

    function enableButton() {
        submitButton.prop('disabled', false);
    }
});