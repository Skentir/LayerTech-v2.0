## Tutorial for validating create and update to database features in Vue
### On your template, find the form in which you're creating and/or updating the data and follow this format

```javascript
<v-form ref="form">
<v-text-field v-model="editedItem.mortality_rate"
    :rules="rules.mortality_rate" label="Mortality Rate" required/>
</v-form> 
```
#### Rules in the data section of your script

```javascript
rules {
    mortality_rate: [
        val => !!val || 'This field is required',
        val => /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(val) || 'Integer or float must be valid.'],
}
```
The array for mortality rate dictates the rules needed for it to be valid.
For example, for the first item, if the val for mortality_rate is null (invalid), then the rule would instead output the string after the condition. This is the same case for the second part in which we are checking the value by ways of regex if the value is a valid integer or float that is more than 0.

### How to validate on submit

On the methods of your script, add this on the submit function for the form:
```javascript
 async submit() {
      if (this.$refs.form.validate()) {
          //Your axios functions here
      }
 }
```
The $refs.form.validate() is a built-in function for the references in a form that triggers the invalidation strings in that form if any of the rules is invalidated. Due to the placement of the if statement, the user won't be able to submit any data to the route until all the contents of the form is valid.

That's it!!
