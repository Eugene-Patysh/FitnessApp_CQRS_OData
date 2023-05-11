﻿using FluentValidation;

namespace FitnessApp_CQRS_OData.Logic.Validators
{
    public class CustomValidator<T> : ICustomValidator<T>
    {
        private readonly IValidator<T> _validator;
        public CustomValidator(IValidator<T> validator)
        {
            _validator = validator;
        }
        public void Validate(T objectDto, string ruleSetName)
        {
            var validationResult = _validator.Validate(objectDto, v => v.IncludeRulesNotInRuleSet().IncludeRuleSets(ruleSetName)); //IncludeAllRuleSets IncludeRuleSets("*")
            if (!validationResult.IsValid)
                throw new Exception(validationResult.ToString());
        }

        public bool IsValid(T objectDto, string ruleSetName, out string message)
        {
            var validationResult = _validator.Validate(objectDto, v => v.IncludeRulesNotInRuleSet().IncludeRuleSets(ruleSetName));
            message = validationResult.ToString();
            return validationResult.IsValid;
        }
    }
}
