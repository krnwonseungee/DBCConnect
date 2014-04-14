# Testing

Below expectations.

1.  Your test suite does not pass.  Are you not using TDD?
2.  I think that your use of controller tests is not quite right.  Consult this
    document: http://matthewlehner.net/rails-api-testing-guidelines/
    * You should be testing status code
    * Test what the response is
    * Don't test that the thing that you assign things to changes...what if you
    extract that behavior to a method or method object?  You'd be required to
    keep the same names for the variables, and that's nuts.
3.  In general the tests are not really useful.
4.  I suspect that the reason (1, supra) is the case is because (2, supra).
    You've written brittle tests and they're already showing you their
    brittleness.  That may be an advantage -- they want you to leave a bad
    design earlier than later.
5.  

# Application Use

1.  I can't log into the application because of a nil error on current\_user
2.  You are clearly not testing enough

# Javascript polling

Can you drop the poll time or offer a way to dial that back down?  It make it
hard to debug.

# Javascript Testing

Tried to run the tests, didn't work.

# Controllers

I like very much that you're trying this JS front-end app.  What I might
suggest is that you look into ActiveModel Serializers.  They are a way to
specify presenters for models so that you don't have to do the

      {some: thing, else: @an\_instance }.to\_json

song and dance.

# Don't commit your log files

# Don't commit .eps files

Do you really need a scalable vector image that's not renderable by browsers in
your code base?

# JS:  I think that it's pretty good...but need to actually be able to use the site.
