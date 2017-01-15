# FunStuff
## Idea
* Tracking piano progress
* Ways to track?
  * Upload a video, what exercises done
  * People decide what to learn next from the videos
  * Record what pieces/scales you've learned
      * After some time replay the old pieces and compare current performance with old
  * Record which exercises you have done and whether you played it with no mistakes
      * over time, should be able to play multiple exercises in a day at 100%
* Borrowing from learning vocabulary in Japanese
    * Use flashcard system, 'Anki', which utilizes [**spaced repetition**](https://en.wikipedia.org/wiki/Spaced_repetition) (learned vocabulary won't show up for 3 months, unlearned vocabulary will show up repeatedly within days)
    * We can think of each 'vocabulary' card as 'exercises'. So the system will prioritize unlearned or un-mastered exercises before mastered ones.
    * Requires subjective evaluation for completing a task (level of ease: failed, good but requires practice, mastered)


## Design Requirements
* Open an app, what should it do next?
    1. Functionality to add exercises
    2. Input which book, number.
        * Example: { Book : "Some Classic", Scale: "C Major", Exercise: "Triads and Inversions"}
    3. It shows "Next Exercise", based on spaced-reptition scheduling algorithm
       * Example: { Book: "Some Classic", Scale: "C Major", Exercise: "Basic C Major - one octave"}
    4. Play it!

    5. Mark the level of ease

    6. Repeat steps 3-5

* What should you see for progress?
    * <s>-Stuff that makes you feel good, like a photo of Donald Trump; it reads, "I'm making America great again!" with a scintillating smile.</s>
    * Pie chart of the level of ease for a given chapter/section

## Tech Stack - Implementation Details
* MEAN stack (maybe ask Michael if it's a good stack?)
* Single page app? Tab or something for queues and history. (TODO: user interface. Consider getting inspiration from reputable todo lists or apps? Examples: Trello? Evernote)?

* Q: What differs this from Anki app? Specific to practicing piano?

> A: Listen as you play (need more research)
> * Give you a rating.
> * This is a horrible idea but... (I love it already) we train classifiers with labelled examples of good piano music (Yiruma) and bad piano music (cats jumping on piano) and we predict a regression score on audio of your practices. => Super naïve method
> * Possibly use [**synthesia**](http://www.synthesiagame.com/) as a way to compare

> A: Nostalgic factor
> * Save first and last audio to compare progress. However, people won't revisit first audio that often because they've seen how bad it is.

> A: Social factor of connecting to Soundcloud
> * Publish your audio samples under a public/private account and await Internet's judgement, assuming people will listen to exercises.

## Roadmap
Note: Create Github Issues for each task and designate roles.

1. Setup Github repo
2. "Hello World" on MEAN stack (we both work on it but ultimately git push one of our copies) with blank webpage.
3. CRUD mock entry on MongoDB (CLI usage, no UI yet).
4. Deployment blank MEAN app (Heroku/github pages?)
5. Design a minimal page with buttons/links to create/read/update/delete exercises. Get data through the stack
6. Design the UI
7. Implement the scheduling algorithm (backend)
8. Research on how to store clicks
9. Create data visualization that updates based on database(?) or clicks(?)
10. Will figure as it goes ...


## FAQ:

Q: How do we decide skills? we don't...?
> Assumption: By completing the book, you ... more or less... master piano? Sure!

Q: What if you don't want to play it? Ignore?
> * If you think it's easy
>   * You can choose not to play it, and mark the exercise as 'easy" =>  will not revisit for a long time
> * If you think it's hard
>   * You can choose not to play it, and mark it as "hard/un mastered" => will revisit soon

Q: Does one add all exercises in the beginning? Or add as you go?
> Add as you go. Algorithm should handle.

## Timeline
* (01/15) - Brainstorm session
  * Hoping to get a fleshed-out idea with major decisions (technologies, design requirements decided).
