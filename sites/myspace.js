/**
 * Copyright 2007 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var MYSPACE_URI_RE = /index\.cfm\?fuseaction=(.+)&friendID=(\d+)/i;

// match $1 = number, or $2 = username, followed by optional query
// parameters, or nothing
var MYSPACE_URI_SLASH_WHATEVER = /^\/(\d+)|([a-z]\w*)(?:\?|$)/;

// actions which, if seen in a URL, likely point to a user or her content
var MYSPACE_USER_ACTIONS = {
  "user.viewprofile": 1,
  "blog.listall": 1,
  "blog.confirmsubscribe": 1,
};

function urlToGraphNode_MySpace(url, host, uri) {
  var m = MYSPACE_URI_RE.exec(uri);
  if (m) {
    var action = m[1].toLowerCase();
    var userid = m[2];
    if (MYSPACE_USER_ACTIONS[action]) {
      return "sgn://myspace.com/?pk=" + userid;
    }
  }
  if (host == "profile.myspace.com") {
    m = MYSPACE_URI_SLASH_WHATEVER.exec(uri);
    if (m) {
      if (m[1]) {
        return "sgn://myspace.com/?pk=" + m[1];
      }
      if (m[2]) {
        return "sgn://myspace.com/?ident=" + m[2];
      }
    }
  }

  // pass through non-recognized myspace URLs changed
  return url;
};

registerDomain("myspace.com", {
 urlToGraphNode: commonPatternSlashUsername("myspace.com",
                                            urlToGraphNode_MySpace),
});

registerDomain(["profile.myspace.com",
                "blog.myspace.com"], {
 urlToGraphNode: urlToGraphNode_MySpace,
});

__END__

http://myspace.com/foobar			sgn://myspace.com/?ident=foobar
http://www.myspace.com/foobar			sgn://myspace.com/?ident=foobar
http://myspace.com/foobar/			sgn://myspace.com/?ident=foobar

http://profile.myspace.com/37715961		sgn://myspace.com/?pk=37715961
http://profile.myspace.com/uhhhh_freakin_idiot  sgn://myspace.com/?ident=uhhhh_freakin_idiot
http://profile.myspace.com/k93			sgn://myspace.com/?ident=k93

http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=73394553   sgn://myspace.com/?pk=73394553
http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID=64410858          sgn://myspace.com/?pk=64410858
http://blog.myspace.com/index.cfm?fuseaction=blog.ConfirmSubscribe&friendID=64410858 sgn://myspace.com/?pk=64410858
http://profile.myspace.com/index.cfm?fuseaction=user.viewProfile&friendID=34718576   sgn://myspace.com/?pk=34718576

profile(sgn://myspace.com/?pk=123)	http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=123
blog(sgn://myspace.com/?pk=123)		http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID=123
rss(sgn://myspace.com/?pk=123)		http://blog.myspace.com/blog/rss.cfm?friendID=123
