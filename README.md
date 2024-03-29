# ReadMe
## Current Members
Clay and Michelle!!!!

# Setup

## Git stuff
All contributions to this code base should follow the typical
git style of contribution; checkout a new branch, write your 
code, submit a pull request, get your PR approved, and submit.

To checkout a new branch, do 
```
$ git checkout master
$ git checkout -b [your_unique_branch_name]
```

Make your commits and be sure to push at least once. The first time
you push, git will yell at you because you haven't set the upstream branch,
and then it will recommend a command for you to use to set the upstream
branch. It should look something like this: 
```
git push --set-upstream origin my_first_branch
```
You should run this command unless you know what you're doing and would like
to do something else.


To submit a pull request, go onto git, click 'New Pull Request',
and click the 'compare' dropdown. Find your branch name and click on it.

Once you do, you will be redirected to a page where you can fill out info about
your pull request. Use this space to clarify things for your reviewers. Once you are
ready for your PR to be seen by others, hit 'Create pull request'.

From there, reviewers can comment on your code, and you can continue to commit to
the PR until it satisfies your reviewers. After that, you can run the necessary merges
and submit your code to the master branch.

## Deploys
To deploy to gcloud:
```gcloud app deploy --no-promote app.yaml index.yaml```

To build a production version of the frontend: 
```webpack -p --env.prod```

## Testing

To get our tests to run, download nosegae: https://github.com/Trii/NoseGAE

```nosetests -xs --with-gae --nologcapture```
from the src subdirectory will run all python tests in the project.
```nosetests -xs --with-gae --nologcapture backend/tests/test_backend.py:TestAuth.test_stays_logged_in```
or similar syntax will run the specific test you request.

# Backing up the datastore
This is a thing you should do whenever you are running scripts over the datastore.
Check out this page for specifics: https://cloud.google.com/datastore/docs/console/datastore-backing-up-restoring

