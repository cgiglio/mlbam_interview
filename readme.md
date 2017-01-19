## MLBAM Web Software Challenge

#### Christopher Giglio



### Technologies Used:

- HTML
- CSS
- Javascript w/ jQuery

### Overview

The specifications given were as follows:

- Using the JSON feed given, parse out the data for each game and construct a simple outputted horizontal list carousel.
- Within the JSON, you’ll find an array of thumbnail objects within the video thumbnails object. Use the
  smaller Thumbnail: **scenario**: "7"
- On hover:
  - The element should scale up by 125%
  - Display some descriptive metadata above and below the thumbnail, such as “location” & “venue”
  - Incorporating transitions, animations or any other visual aesthetic is acceptable and encouraged

To meet this specifications, I elected to implement my own carousel as I felt that would be more in the spirit of the exercise than using a pre-existing one. Because of the limited time and the overhead of setting up an environment for something like React, I chose not to use a development framework. Instead, all of the data is read in through the given JSON and then dynamically inserted as HTML via jQuery.

To launch the application, open a terminal window, cd into the directory, and run the command

```bash
python -m SimpleHTTPServer
```

Then, go to http://localhost:8000/ in your browser.

### Carousel Implementation

The carousel is implemented by only rendering 7 items at a time from the JSON provided. First, I populate an array of game data, select the first 7 items, and render them. When the user hits "next," or the rightmost button, the leftmost item is removed from the DOM and the next item in the array is appended to the end of the list (or, if the rightmost item is the last in the array, I append the first item of the array). The opposite occurs when the "previous," or leftmost button is clicked – meaning an item is prepended. While this pattern does result in lots of additions and removals to the DOM, which can be expensive, it does ensure that there are never too many items on the page. As a result, not every single JSON item is rendered, keeping the page lean. The hover animations are done in CSS with the :hover trigger, while the box score information appears using a mouseover/mouseleave trigger in JavaScript. 

### Metadata Choices/Implementation

On hover, the user sees the matchup above the thumbnail in the form of "Away Team Abbrevation @ Home Team Abbreviation." This gives the user information about both teams and the location of the game. Below the thumbnail, the user sees the game venue and location, as well as the full box score with the teams' records. Below that is a link to the MLBTV cast (because I do not have access to BAM servers, it simply pops up an alert to show the path to the stream) and information about the winning pitcher, losing pitcher, and saving pitcher (if applicable). 

Because all of the games in the data set were over, I did not opt to include information such as number of outs, batter at the plate, or count. In an implementation using live data, I would have chosen to provide that information. However, because the games were all finished, I chose to provide the most relevant information.

### Areas for Improvement 

The largest weakness of the code as it stands right now is that it relies on jQuery .append() calls to add data to the DOM. With more time, I would have used a framework and populated more flexible models to provide efficient updates to the DOM. As it currently stands, I use the array of games as a model and my JavaScript code as a controller, but there does not exist an efficient link between the controller and the view. Because of this weakness, I opted to only render the 7 visible items at once.

Another area for improvement would be the animations on the carousel next/prev buttons. Currently, there is no animation when hitting the buttons; instead, the elements are simply removed/added to the DOM and the resulting motion is unadorned. A better version would pre-load the next elements on either side and gracefully transition them across the screen while removing the end element. Given the time constraints, I felt that this would distract me from working on other portions of the assignment.

### Final Thoughts

In my usage, the carousel was always able to quickly load data and handle extremely rapid clicks in both directions. The data always correctly loaded and transitions worked seamlessly. Although the design of the code could certainly be improved, as mentioned above, to increase scalability, the solution given performs well with the given data. 

Personally, I enjoyed working on this challenge and creating frontend code. Problems such as choosing a framework (or sticking with basic JavaScript), picking what data to display, or deciding how to handle the lack of usable video links were all challenges that were fun design tasks. The time constraint definitely added another element to the problem that made me have to think quickly and decisively. I hope you enjoy the result.