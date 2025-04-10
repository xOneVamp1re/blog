import PropTypes from 'prop-types'

import { ModifyButton } from '@shared/ui/button/ModifyButton'
import { Input } from '@shared/ui/input'
import styles from '@shared/styles/ArticleForm.module.scss'

export const TagsInput = ({ register, errors = {}, resetField, unregister, tagsData = [], setTagsData }) => {
  const handleClickDeleteTag = (index) => {
    const updatedTags = tagsData.filter((_, i) => i !== index)
    setTagsData(updatedTags)
    resetField(`tag-${index}`)
    unregister(`tag-${index}`)
  }
  const handleClickAddTag = () => {
    setTagsData([...tagsData, ''])
  }
  const validation = {
    tags: {
      required: 'Tags can not be empty',
    },
  }

  return (
    <ul className={styles['form-tags']}>
      Tags
      {tagsData.map((el, index) => {
        return (
          <li className={styles['form-tag']} key={index}>
            <Input
              type="text"
              id={index}
              placeholder="Tag"
              classNames={{ input: 'tags' }}
              validation={{ ...register(`tag-${index}`, validation.tags) }}
              error={errors.tags[index]}
            />
            <ModifyButton buttonText="Delete" action="delete" cb={() => handleClickDeleteTag(index)} />
            {index === tagsData.length - 1 && tagsData.length < 5 && (
              <ModifyButton buttonText="Add Tag" action="add" cb={handleClickAddTag} />
            )}
          </li>
        )
      })}
      {!tagsData.length && <ModifyButton buttonText="Add Tag" action="add" cb={handleClickAddTag} />}
    </ul>
  )
}

TagsInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  resetField: PropTypes.func,
  unregister: PropTypes.func,
  tagsData: PropTypes.array,
  setTagsData: PropTypes.func,
}
