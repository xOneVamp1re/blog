import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'
import { SubmitButton } from '@shared/ui/button/SubmitButton'
import styles from '@shared/styles/ArticleForm.module.scss'

import { formFields } from '../const/formFields'
import { useCreateArticleMutation } from '../api/createArticleApi'

import { TagsInput } from './TagsInput'

export const CreateArticle = () => {
  const { register, handleSubmit, formState, control, resetField, unregister, clearErrors, reset } = useForm({
    mode: 'onChange',
  })
  const [tagsData, setTagsData] = useState([])
  const [createArticle] = useCreateArticleMutation()
  const navigate = useNavigate()

  const onSubmit = async ({ title, description, body, ...rest }) => {
    const tagsField = Object.values(rest)
    const article = {
      title,
      description,
      body,
      tagList: tagsField.filter((tag) => tag.trim() !== ''),
    }
    const response = await createArticle({ article })
    if (response.data) {
      reset()
      navigate(`/article/${response.data?.article.slug}`)
    }
  }

  const validation = {
    title: {
      required: 'Title is required',
      minLength: {
        value: 3,
        message: 'Title must be at least 3 characters long',
      },
      pattern: {},
    },
    description: {
      required: 'Short description is required',
    },
    body: {
      required: 'Text is required',
    },
  }
  const errors = {
    title: formState.errors['title']?.message,
    description: formState.errors['description']?.message,
    body: formState.errors['body']?.message,
    tags: tagsData.reduce((acc, value) => {
      acc[`tag-${value.id}`] = formState.errors[`tag-${value.id}`]?.message
      return acc
    }, {}),
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className={styles['form-fieldset']}>
        <legend className={styles['form-legend']}>Create new article</legend>

        {formFields.map((field) => {
          return field.type === 'textarea' ? (
            <Controller
              name={field.id}
              key={field.id}
              control={control}
              defaultValue=""
              rules={validation[field.id]}
              render={({ field }) => (
                <Textarea
                  {...field}
                  type="textarea"
                  label="Text"
                  htmlFor="body"
                  id="body"
                  onChange={(e) => {
                    field.onChange(e)
                    clearErrors('body')
                  }}
                  placeholder="Text"
                  error={errors?.body}
                />
              )}
            />
          ) : (
            <Input
              key={field.id}
              type={field.type}
              label={field.label}
              htmlFor={field.htmlFor}
              id={field.id}
              placeholder={field.placeholder}
              validation={{ ...register(field.id, validation[field.id]) }}
              error={errors[field.id]}
            />
          )
        })}
        <TagsInput
          register={register}
          errors={errors}
          resetField={resetField}
          unregister={unregister}
          setTagsData={setTagsData}
          tagsData={tagsData}
        />
      </fieldset>
      <SubmitButton className="send" label="Send" type="submit" disabled={Object.keys(formState.errors).length > 0} />
    </form>
  )
}
