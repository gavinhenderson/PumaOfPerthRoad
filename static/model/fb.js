module.exports = () => {
  $.ajaxSetup({ cache: true });
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '714517088910202',
      version: 'v2.7'
    });
    FB.ui({
      method: 'share',
      href: 'https://developers.facebook.com/docs/'
    }, function(response){});
  });
}
