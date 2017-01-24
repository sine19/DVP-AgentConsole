/** * Created by Damith on 1/18/2017. */agentApp.factory('chatService', function ($rootScope, $q, loginService, baseUrls) {    //connected to the IP Messaging services    var chatSubscribers = {};    var statusSubcribers = [];    var chatSubscribeAll = [];    var pendingSubcribers;    var OnConnected = function () {        console.log("OnConnected..............");        var token = loginService.getToken();        SE.authenticate({            success: function (data) {                console.log("authenticate..............");            },            error: function (data) {                console.log("authenticate error..............");            },            token: token        });    };    var OnEcho = function (o) {        console.log("OnEcho..............");    };    var OnEvent = function (o) {        console.log("OnEvent..............");    };    var OnStatus = function (o) {        console.log("OnStatus..............");        statusSubcribers.forEach(function (func) {            func(o);        });    };    var OnMessage = function (o) {        console.log("OnMessage..............");        if (o) {            if (chatSubscribers[o.from]) {                chatSubscribers[o.from]('message', o);            } else {                if (chatSubscribeAll.length > 0) {                    chatSubscribeAll.forEach(function (func) {                        func(o);                    });                }            }        }    };    var OnSeen = function (o) {        console.log("OnMessage..............");        if (o) {            if (chatSubscribers[o.from]) {                chatSubscribers[o.from]('seen', o);            }         }    };    var OnTyping = function (o) {        console.log("OnTyping..............");        if (o) {            chatSubscribers[o.from]('typing', o);        }    };        var OnPending = function(o){        if (pendingSubcribers) {            pendingSubcribers( o);        }    }    var OnTypingstoped = function (o) {        console.log("OnTypingstoped..............");        if (o) {            chatSubscribers[o.from]('typingstoped', o);        }    };    var OnDisconnect = function (o) {        console.log("OnDisconnect..............");    };    var OnClient = function (o) {        console.log("OnClient..............");    };    var OnError = function (o) {        console.log("OnError..............");    };    var OnAccept = function (o) {        console.log("OnAccept..............");    };    var OnLatestMessage = function (o) {        console.log("OnLatestMessage..............");        if (o) {            chatSubscribers[o.from]('latestmessages', o);        }    };        var OnChatStatus = function(o) {        if (o) {            if (chatSubscribers[o.from]) {                chatSubscribers[o.from]('chatstatus', o);            }        }    }        var callBackEvents = {        OnConnected: OnConnected,        OnEcho: OnEcho,        OnEvent: OnEvent,        OnStatus: OnStatus,        OnMessage: OnMessage,        OnSeen: OnSeen,        OnTyping: OnTyping,        OnTypingstoped: OnTypingstoped,        OnDisconnect: OnDisconnect,        OnClient: OnClient,        OnAccept: OnAccept,        OnLatestMessage: OnLatestMessage,        OnError: OnError,        OnPending: OnPending,        OnChatStatus: OnChatStatus    };    var connect = function () {        SE.init({            serverUrl: baseUrls.ipMessageURL,            callBackEvents: callBackEvents        });    };    var request = function (status, from) {        SE.request({type: status, from: from})    };    // chat user mapping ----------------------------    var chatUserObj = [];    var getCurrentChatUser = function () {        return chatUserObj;    };    var setChatUser = function (user) {        if (user) {            var item = chatUserObj.filter(function (item) {                return item.username == user.username;            });            if (Array.isArray(item) && item.length == 0) {                chatUserObj.push(user);            }        }        $rootScope.$broadcast("updates");    };    var DelChatUser = function (username) {        if (username) {            var index = chatUserObj.findIndex(function (item) {                return item.username == username;            });            delete chatSubscribers[username];            chatUserObj.splice(index, 1);        }        $rootScope.$broadcast("updates");    };    var SubscribeChat = function (sub, func) {        chatSubscribers[sub] = func;    };    var SubscribeStatus = function (func) {        statusSubcribers.push(func);    };    var SubscribePending = function (func) {        pendingSubcribers = func;    };    var SubscribeChatAll = function (func) {        chatSubscribeAll.push(func);    };    return {        connectToChatServer: connect,        Request: request,        OnEvent: OnEvent,        OnTyping: OnTyping,        SetChatUser: setChatUser,        DelChatUser: DelChatUser,        GetCurrentChatUser: getCurrentChatUser,        onUserStatus: OnStatus,        SubscribeChat: SubscribeChat,        SubscribeStatus: SubscribeStatus,        SubscribeChatAll: SubscribeChatAll,        SubscribePending: SubscribePending            }});