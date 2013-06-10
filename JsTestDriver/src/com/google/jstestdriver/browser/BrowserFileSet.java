/*
 * Copyright 2010 Google Inc.
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

package com.google.jstestdriver.browser;

import com.google.jstestdriver.FileInfo;

import java.util.Collections;
import java.util.List;

/**
 * Represents the state of the files loaded into a browser.
 * @author corysmith@google.com (Cory Smith)
 *
 */
public class BrowserFileSet {

  private List<FileInfo> fileToUpload;
  private List<FileInfo> extraFiles;
  private final boolean reset;


  public BrowserFileSet() {
    this(Collections.<FileInfo>emptyList(), Collections.<FileInfo>emptyList(), false);
  }

  public BrowserFileSet(List<FileInfo> fileToUpload, List<FileInfo> extraFiles, boolean reset) {
    this.fileToUpload = fileToUpload;
    this.extraFiles = extraFiles;
    this.reset = reset;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((extraFiles == null) ? 0 : extraFiles.hashCode());
    result = prime * result + ((fileToUpload == null) ? 0 : fileToUpload.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    BrowserFileSet other = (BrowserFileSet) obj;
    if (extraFiles == null) {
      if (other.extraFiles != null) return false;
    } else if (!extraFiles.equals(other.extraFiles)) return false;
    if (fileToUpload == null) {
      if (other.fileToUpload != null) return false;
    } else if (!fileToUpload.equals(other.fileToUpload)) return false;
    return true;
  }

  /** Files that need to be uploaded to sync client, server and browser state. */
  public List<FileInfo> getFilesToUpload() {
    return fileToUpload;
  }

  /**
   * Extra files are files that have not been requested to be loaded into the
   * browser, but are already there.
   */
  public List<FileInfo> getExtraFiles() {
    return extraFiles;
  }

  @Override
  public String toString() {
    return "BrowserFileSet [fileToUpload=" + fileToUpload + ", extraFiles=" + extraFiles + "]";
  }

  /**
   * @return
   */
  public boolean shouldReset() {
    return reset;
  }
}
