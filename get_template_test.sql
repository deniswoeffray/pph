select category.name, question.position, question.question, question.description from question, category where question.category_id = category.id order by category.id;
