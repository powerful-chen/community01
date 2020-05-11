function post() {
    var questionId = $("#question_id").val();
    var content = $("#comment_content").val();
    if (!content) {
        alert("不能回复空内容哦！");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/comment",
        contentType: 'application/json',
        data: JSON.stringify({
            "parentId": questionId,
            "content": content,
            "type": 1
        }),
        success: function (response) {
            if (response.code == 200) {
                window.location.reload();
            } else {
                if (response.message == 2003) {
                    var isAccepted = confirm(response.message);//confirm：作用是把消息放到Windows框内
                    if (isAccepted) {
                        window.open("https://github.com/login/oauth/authorize?client_id=9bd006ebbd6c194266ca&redirect_uri=http://localhost:8888/callback&scope=user&state=1");
                        window.localStorage.setItem("closable", true);//存变量
                    }
                } else {
                    alert(response.message);
                }
            }
        },
        dataType: "json"
    });
}