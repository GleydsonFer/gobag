jQuery(function(){
	jQuery(document).ready( function(){

        var html = jQuery('html');

        var words = [
            '5% desconto no Boleto',
            '7 dias para troca grátis',
            'Parcelamento no cartão de crédito'
            ], i = 0;
        setInterval(function(){
            jQuery('.changeWord').fadeOut(function(){
                jQuery(this).html(words[i=(i+1)%words.length]).fadeIn();
            });
        }, 2000);
	});

}); 

function changeWord(){
    var words = [
        '5% desconto no Boleto',
        '7 dias para troca grátis',
        'Parcelamento no cartão de crédito'
        ], i = 0;
    setInterval(function(){
        jQuery('.changeWord').fadeOut(function(){
            jQuery(this).html(words[i=(i+1)%words.length]).fadeIn();
        });
    }, 2000);
}