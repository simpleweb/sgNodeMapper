/*

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

package com.google.code.sgnodemapper;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;

import java.io.InputStreamReader;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.io.IOException;

public class NodeMapper {

  private final Scriptable scope;
  private final Function urlToGraphNodeFunction;

  public NodeMapper(String nodeMapperJavaScript) {
    Context context = Context.enter();
    scope = context.initStandardObjects();

    // work with either new or old entrypoints.
    nodeMapperJavaScript +=
        "\n if (!URLToGraphNode) { " +
        "  URLToGraphNode = nodemapper.urlToGraphNode; }\n";

    context.evaluateString(
        scope, nodeMapperJavaScript, "nodemapper.js", 1, null);
    urlToGraphNodeFunction = (Function) scope.get("URLToGraphNode", scope);
    context.exit();
  }

  /**
   * Returns an sgn:// URL, if possible, for the given url,
   * else returns the provided URL back.
   *
   * @arg url URL to try and map to sgn:// node
   * @returns an sgn:// URL, if the provided url was recognized
   *          as a supported type, else returns the provided url
   *          back.
   */
  public String urlToGraphNode(String url) {
    Context context = Context.enter();
    Object functionArgs[] = { url };
    Object objResult = urlToGraphNodeFunction.call(
        context, scope, scope, functionArgs);
    String result = Context.toString(objResult);
    context.exit();
    return result;
  }
}
