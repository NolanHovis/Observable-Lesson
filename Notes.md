# Using Subjects to Handle Errors
<hr>
<br>

<hr>

### Basic App Rundown
This is a simple app that allows us to pick candy to put in your bucket. Right now we can put as much candy in the bucket as we want, but we want to make it so that we can limit our candy to five pieces. When we get to five pieces we want to end our ability to add candy, if we go over five pieces of candy we want to throw an error.
<br>
<hr>

### Step One: Adding the Subject
<hr>

1. We will add our subject in the candy service.
   ```typescript
    bucketLimit = new Subject<number>();
   ```
   - the subject will be subscribed to in our candy app so that we can apply logic to handle things like what data our subject will listen for and what to do with it based on certain parameters
2. Now we will subscrobe to our subject in the ngOnInIt
   ```typescript
    this.candyService.bucketLimit.subscribe((data) => {
      console.log(data);
    });
   ```
   - We console log so that we can see the how the data will be applied to the subject
   - We do not need to unsubscribe in this case because we would not have anything going on in the background. If we had a running calculation that would slow our app down, we would need to unsubscribe.
<br>
<hr>

### Step Two: Add Logic for our Subject
<hr>

1. Now we will change our onClickCandy method to send data for the subject to listen to.
   ```typescript
    this.candyService.bucketLimit.next(this.bucket.length + 1);
   ```
   - next() is telling our subject what to listen to. In this case we want to listen to the length of the bucket array so we can tell when there is too much candy in the bucket.
2. Now we will use the error() method to tell the user when they put too much candy in the bucket.
   ```typescript
    if (this.bucket.length > 5) {
      this.candyService.bucketLimit.error('Too Much Candy');
    }
   ```
3. Next we use the complete() method
   ```typescript
    if (this.bucket.length == 5) {
      this.candyLimiter = true;
      this.candyService.bucketLimit.complete();
    }
   ```
   - The complete method lets the subject know that whatever we planned for the subject to do was accomplished. Then it stops listening. As you can see when we click passed five candy bars we no longer get the console log, however we are able to still add candy. The error also doesn't show up... why? Because the we completed the sequence
4. to make it so that we can't add more candy when we get to five we need logic to stop that ability.
   ```typescript
    candyLimiter = false;
   ```
   - Add the candyLimiter and set it to false
5. Then we will add another if statement to only allow us to add candy when it is false
   ```typescript
    if (this.candyLimiter === false) {
      this.candyService.saveCandy(candy);
    }
   ```
6. Now we will set it to true when we complete our limit
   ```typescript
    if (this.bucket.length == 5) {
      this.candyLimiter = true;
      this.candyService.bucketLimit.complete();
    }
   ```
   - Now when we reach five candy bars we can't do any more.
<br>
<hr>

### Use Cases
<hr>

- Http requests (When you recieve data you complete it and can send a notification letting you know it was succesfull. Otherwise, you can send an error)
   
