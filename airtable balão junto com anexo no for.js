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
        const regex = /(?:(ftp|http[s]?:)?)?([w]{3}[.])?[^\s]*[.](pdf|img|jpg|png|gif|ogv|webm|mp3)/gi
        builder
        .setSessionVariable('intencao', {nome: faq, resposta: responseMessage});

        

        for (const part of messageParts) {
                       
           
            const attachment = part.match(regex);
            
             //builder.addMessage(`@${attachment}@`)

            if (attachment) {
                    
                    let fileAttachment = attachment[0];
                    const mediaPorts = part.replace(fileAttachment, '');
                    //builder.addMessage(`@${fileAttachment}@`)

                if (fileAttachment.includes('.pdf')) {
                    builder
                        builder.setSessionVariable('attachment', { link: fileAttachment, type: 'pdf' })  
                        builder.addMessage(mediaPorts);
                        builder.setNextDialogState(caixa_arquivo);
                        b//uilder.addMessage(`@${fileAttachment}@`)
                    


                } else if (attachment.includes('.img') || attachment.includes('.png') || attachment.includes('.jpg') || attachment.includes('.gif')) {

                    builder.setSessionVariable('attachment', { link: attachment, type: 'img' })
                    builder.addMessage(mediaPorts);
                    builder.setNextDialogState(caixa_arquivo);
                    


                } else if (attachment.includes('.ogv') || attachment.includes('.webm')) {

                    builder.setSessionVariable('attachment', { link: attachment, type: 'webm' }) 
                    builder.addMessage(mediaPorts);
                    builder.setNextDialogState(caixa_arquivo);
                    

                }

            } else {
                builder.addMessage(part)                
               

            }
        }

       if(!responseMessage.match(regex)){

           builder.setNextDialogState(nextDialogState);

        }

    }
}

builder.send();

