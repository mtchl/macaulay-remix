# macaulay-remix

The <a href="http://macaulaylibrary.org/">Macaulay Library</a> holds the world's largest collection of wildlife audio and video recordings; they recently published them online. Ed Summers Macaulay Mix project harvested metadata for the whole audio collection and used it to build a simple random remix engine in HTML5.

Building on this content and data, this project creates a simple tag-cloud-like interface for the audio.

namesplitter.js - a node script that processes the item metadata, splitting titles and building a term frequency table and a list of co-occurring terms (showing other terms in the table that share the same items). That data gets written to mcaulay-titleterms.json

The rest of the repo is a simple AngularJS app that loads and displays the title terms, picking an item from each list at random to play.
