nodemapper.registerDomain(["github.com", "gist.github.com"], {
  name: "github.com",
  primaryDomain: "github.com",
  urlToGraphNode: nodemapper.createSlashUsernameHandler("github.com")
});

nodemapper.addSimpleHandler("github.com", "ident_to_profile", "https://github.com/");

__END__

https://github.com/hecticjeff sgn://github.com/?ident=hecticjeff
https://github.com/HecticJeff sgn://github.com/?ident=hecticjeff
https://github.com/HecticJeff/ sgn://github.com/?ident=hecticjeff

http://github.com/hecticjeff sgn://github.com/?ident=hecticjeff
http://github.com/HecticJeff sgn://github.com/?ident=hecticjeff
http://github.com/HecticJeff/ sgn://github.com/?ident=hecticjeff

https://gist.github.com/hecticjeff sgn://github.com/?ident=hecticjeff
https://gist.github.com/HecticJeff sgn://github.com/?ident=hecticjeff
https://gist.github.com/HecticJeff/ sgn://github.com/?ident=hecticjeff

http://gist.github.com/hecticjeff sgn://github.com/?ident=hecticjeff
http://gist.github.com/HecticJeff sgn://github.com/?ident=hecticjeff
http://gist.github.com/HecticJeff/ sgn://github.com/?ident=hecticjeff

profile(sgn://github.com/?ident=hecticjeff) https://github.com/hecticjeff
