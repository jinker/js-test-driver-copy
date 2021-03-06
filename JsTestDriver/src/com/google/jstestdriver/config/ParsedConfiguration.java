/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.google.jstestdriver.config;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.gson.JsonArray;
import com.google.jstestdriver.FileInfo;
import com.google.jstestdriver.Flags;
import com.google.jstestdriver.PathResolver;
import com.google.jstestdriver.Plugin;
import com.google.jstestdriver.browser.DocType;
import com.google.jstestdriver.model.BasePaths;
import com.google.jstestdriver.model.HandlerPathPrefix;

/**
 * Represents a parsed configuration.
 *
 * @author corbinrsmith@gmail.com
 */
public class ParsedConfiguration implements Configuration {
  private final Set<FileInfo> filesList;
  private final String server;
  private final List<Plugin> plugins;
  private final Set<FileInfo> excludedFiles;
  private final long testTimeout;
  private final List<FileInfo> tests;
  private final BasePaths basePaths;
  private final JsonArray gatewayConfig;
  private final DocType doctype;

  public ParsedConfiguration(Set<FileInfo> filesList, Set<FileInfo> excludedFiles,
      List<Plugin> plugins, String server, long testTimeout, BasePaths basePaths, List<FileInfo> tests,
      JsonArray gatewayConfig, DocType doctype) {
    this.filesList = filesList;
    this.excludedFiles = excludedFiles;
    this.plugins = plugins;
    this.server = server;
    this.testTimeout = testTimeout;
    this.basePaths = basePaths;
    this.tests = tests;
    this.gatewayConfig = gatewayConfig;
    this.doctype = doctype;
  }

  public Set<FileInfo> getFilesList() {
    Set<FileInfo> finalList = new LinkedHashSet<FileInfo>(filesList);
    finalList.removeAll(excludedFiles);
    return finalList;
  }

  public List<Plugin> getPlugins() {
    return plugins;
  }

  public String getServer(String flagValue, int port, HandlerPathPrefix handlerPrefix) {
    if (flagValue != null && flagValue.length() != 0) {
      return handlerPrefix.suffixServer(flagValue);
    }
    if (server.length() > 0) {
      return handlerPrefix.suffixServer(server);
    }
    if (port == -1) {
      throw new ConfigurationException("Oh Snap! No server defined!");
    }

    return handlerPrefix.suffixServer(String.format("http://%s:%d", "127.0.0.1", port));
  }

  @Override
  public String getCaptureAddress(String server, String captureAddress,
      HandlerPathPrefix prefix) {
    if (captureAddress != null && !captureAddress.isEmpty()) {
      return prefix.suffixServer(captureAddress);
    } else {
      return server;
    }
  }

  @Override
  public Configuration resolvePaths(PathResolver resolver, Flags flags) {
    Set<FileInfo> resolvedFiles = resolver.resolve(filesList);
    Set<FileInfo> testFiles = resolver.resolve(Sets.newLinkedHashSet(tests));
    Set<FileInfo> resolvedExcluded = resolver.resolve(excludedFiles);
    resolvedFiles.removeAll(resolvedExcluded);
    testFiles.removeAll(resolvedExcluded);
    return new ResolvedConfiguration(
        resolvedFiles,
        resolver.resolve(plugins),
        getServer(
            flags.getServer(),
            flags.getPort(),
            flags.getServerHandlerPrefix()),
        testTimeout,
        basePaths,
        Lists.newArrayList(testFiles),
        gatewayConfig);
  }

  public long getTestSuiteTimeout() {
    return testTimeout;
  }

  public List<FileInfo> getTests() {
    return tests;
  }

  public BasePaths getBasePaths() {
    return basePaths;
  }

  public JsonArray getGatewayConfiguration() {
    return gatewayConfig;
  }

  public DocType getDocType() {
    return doctype;
  }
}
