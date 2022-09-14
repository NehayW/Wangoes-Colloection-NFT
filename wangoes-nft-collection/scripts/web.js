
if (typeof window.ethereum !== 'undefined') {
    $('.con-after').show()
    $('#imeta').hide()
}
else
{
  $('.con-after').hide()
  $('#imeta').show()
}

$('#show').click(function(e){
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum
    .request({
      method: "eth_requestAccounts",
    })
    .then((accounts) => {
      console.log(accounts[0]);
      $('#account').text("Connected account :- "+accounts[0])
    })
    .catch((error) => {
      alert("Something went wrong");
    });
   } 
})

$(".mint").click(function(){
    data = {
      'tokenURI' : $(this).parent().children()[0].src.split("/static")[1],
    }
    $.ajax({url: "/mintNFT", method :'POST', data : data,success: function(result){
    }});
    alert("Nft is minted")
});


$(".withdrawMoney").click(function(){
     $.ajax({url: "/withdrawMoney", method :'POST',success: function(result){
    }});
});