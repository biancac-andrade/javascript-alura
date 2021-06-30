const { faq, nextDialogState, caixa_arquivo, api_token, api_url, errorDialogState, notUnderstood, intentScore } = args;

const builder = ChatlayerResponseBuilder();

// checka as primeiras posições da intent e verifica se é uma intent de FAQ
const FAQRegex = /^(FAQ\/)/g;
const checkFAQIntent = FAQRegex.test(faq);

if (!checkFAQIntent || intentScore < 0.77) {
    builder.setNextDialogState(notUnderstood);
}

else {
    const encode = `{FAQ} != "${faq}"`
    const airtableResult = await fetch(`${api_url}filterByFormula=NOT(${encodeURIComponent(encode)})`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${api_token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())

    if (airtableResult.error) {
        builder
            .setSessionVariable('apiResponse', airtableResult)
            .setNextDialogState(errorDialogState);
    } else {
        const filterResponse = airtableResult.records.filter((record) => record.fields['FAQ'] === faq);
        const responseMessage = filterResponse[0].fields['Respuestas'];
        const messageParts = responseMessage.split('&&');
        const regex = /(?:(ftp|http[s]?:)?)?([w]{3}[.])?[^\s]*[.](pdf|img|jpg|png|gif|ogv|webm|mp3)/g
        const attachment = responseMessage.match(regex);
        builder
        .setSessionVariable('intencao', {nome: faq, resposta: responseMessage});

        for (const part of messageParts) {

            builder.addMessage(part);
        }

        if (attachment) {

            let fileAttachment = attachment[0];

            if (fileAttachment.includes('.pdf')) {
                builder
                    .setSessionVariable('attachment', { link: fileAttachment, type: 'pdf' })
                    .setNextDialogState(caixa_arquivo);

            } else if(attachment.includes('.img') || attachment.includes('.png') || attachment.includes('.jpg') || attachment.includes('.gif') ){

                builder
                    .setSessionVariable('attachment', {link: attachment, type: 'img'})
                    .setNextDialogState(caixa_arquivo);   

            } else if(attachment.includes('.ogv') || attachment.includes('.webm')){

                builder
                    .setSessionVariable('attachment', {link: attachment, type: 'webm'})
                    .setNextDialogState(caixa_arquivo);   
            } 

        } else {
            builder
                .setNextDialogState(nextDialogState);
        }
        //builder
        //.setNextDialogState(nextDialogState);

    }
}

builder.send();