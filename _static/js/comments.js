var apps = {"restriction": 33,"quotas": 32,"qos-shellgui": 31,"lan-net-record": 30,"firewall-extra": 29,"ping-watchdog": 28,"openvpn": 27,"shadowsocks": 26,
"conntrack": 25,"mwan3": 24,"bandwidth-distribution": 23,"setting-dns-cdn": 22,"adbyby-save": 21,"speed-test": 20,"vlan": 19,"bandwidth-usage": 18,
"usb-tethering-modem": 17,"hosts": 16,"wol": 15,"net-diagnostics": 14,"wan": 13,"adv": 12,"lan": 11,"wan": 10,"wifi": 9,
"sysusers": 8,"sysinfo": 7,"disk": 6,"notice": 5,"firmware": 4,"telnetd": 3,"home": 2,"status": 1};


function getIssue(title){
  var issue_id = apps[title];
  var url = 'https://api.github.com/repos/ShellGui/wiki/issues/' + issue_id;
  $.get(url,function(data){
      makeIssue(data,title);
      getComments(data.number,title);
  },'json');
}
function makeIssue(issue,title){
  console.log(arguments);
  var issueDom = '<header>'
              +    '<h3 class="comments-title">留言区&nbsp;&nbsp;<sup><span class="badge">' + issue.comments + '</sup></small></h3>'
              +    '<a href="' + issue.html_url + '#new_comment_field" target="_blank">前往ISSUE发表留言</a>'
              +  '</header>'
              +  '<ul class="comments-list list-group"></ul>';
  $('#' + title + '_comment_container').append(issueDom);
}
function getComments(id,title){
  var url = 'https://api.github.com/repos/ShellGui/wiki/issues/' + id + '/comments';
  $.ajax(url, {
    headers: {Accept: "application/vnd.github.squirrel-girl-preview.full+json"},
    dataType: "json",
    success: function(data){
      makeComments(data,title);
    }
  });
}
function makeComments(comments,title){
  console.log(arguments);
  for(var i=0; i<comments.length; i++){
    var comment = comments[i];
    var date = new Date(comment.created_at);
    date = date.toLocaleString();
    var commentDom = '<li class="list-group-item">'
    +   '<div class="media">'
    +     '<a class="media-left" href="' + comment.user.html_url + '" target="_blank">'
    +       '<img src="' + comment.user.avatar_url + '" alt="" width="60" height="60">'
    +     '</a>'
    +     '<div class="media-body">'
    +       '<h4 class="media-heading">' + comment.user.login + '<br><small><span class="create-date">' + date + '</span></small></h4>'
    +        '<span></span>'
    +       '<div class="comment-body markdown-body">' + comment.body_html + '</div>'
    +      '<a class="comment-reactions" href="' + comment.html_url + '" target="_blank">'
    +          (comment.reactions['heart'] ? '<span class="icon-heart"></span><span class="reaction-count">+' + comment.reactions['heart'] + '</span>' : '')
    +          (comment.reactions['laugh'] ? '<span class="icon-laugh"></span><span class="reaction-count">+' + comment.reactions['laugh'] + '</span>' : '')
    +          (comment.reactions['hooray'] ? '<span class="icon-hooray"></span><span class="reaction-count">+' + comment.reactions['hooray'] + '</span>' : '')
    +          (comment.reactions['confused'] ? '<span class="icon-confused"></span><span class="reaction-count">+' + comment.reactions['confused'] + '</span>' : '')
    +          (comment.reactions['+1'] ? '<span class="icon-plus"></span><span class="reaction-count">+' + comment.reactions['+1'] + '</span>' : '')
    +          (comment.reactions['-1'] ? '<span class="icon-minue"></span><span class="reaction-count">+' + comment.reactions['-1'] + '</span>' : '')
    +      '</a>'
    +     '</div>'
    +   '</div>'
    + '</li>';

    $('#' + title + '_comment_container').find('ul').append(commentDom);
  }
}

$('.comment-container').each(function(){
  var app = $(this).prop('id').replace('_comment_container','');
  getIssue(app);
});
